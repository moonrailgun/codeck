import { isUndefined, uniqBy, values } from 'lodash-es';
import { VarGetNodeDefinition } from '../nodes/definitions/varget';
import { ConnectInfo, useConnectionStore } from '../store/connection';
import {
  CodeckNode,
  CodeckNodeDefinition,
  CodeFunctionPrepare,
  CodePrepare,
  useNodeStore,
} from '../store/node';
import { useVariableStore } from '../store/variable';
import { STANDARD_PIN_EXEC_OUT } from '../utils/consts';
import { formatFunctionIndent } from '../utils/string-helper';

export class CodeCompiler {
  prepares: CodePrepare[] = [];
  moduleType: 'commonjs' | 'esmodule' = 'esmodule';
  /**
   * 是否使用Skypack作为module的处理
   * 仅 esmodule 模式下有效
   */
  useSkypack = false;
  /**
   * 是否为每个节点增加注释
   */
  printComment = true;

  get nodeMap() {
    return useNodeStore.getState().nodeMap;
  }

  get nodeDefinition() {
    return useNodeStore.getState().nodeDefinition;
  }

  get connections() {
    return useConnectionStore.getState().connections;
  }

  get variableMap() {
    return useVariableStore.getState().variableMap;
  }

  /**
   * 生成代码
   */
  generate() {
    const begin = this.findBegin();
    let codeText = '';

    codeText += this.generateVariable();
    codeText += this.generateCodeFromNode(this.getExecNext(begin.id));

    codeText = this.generatePrepareCode() + codeText; // 在头部追加 prepare code

    return codeText;
  }

  /**
   * 从某个开始节点生成代码
   */
  generateCodeFromNode(startNode: CodeckNode | null) {
    let codeText = '';
    let currentNode: CodeckNode | null = startNode;

    // 主流程代码
    while (currentNode !== null) {
      const definition = this.nodeDefinition[currentNode.name];
      this.collectPrepare(definition);

      const codeFn = definition.code;
      const node = currentNode;

      if (codeFn) {
        const buildPinVarName = (pinName: string, nodeId?: string) => {
          return this.buildPinVarName(pinName, nodeId ?? node.id);
        };

        if (this.printComment === true) {
          codeText += `// ${node.id} (node: ${definition.name})\n`;
        }

        codeText += codeFn({
          node,
          buildPinVarName,
          getConnectionInput: (pinName: string, nodeId?: string) =>
            this.getConnectionInput(pinName, nodeId ?? node.id),
          getConnectionExecOutput: (pinName: string, nodeId?: string) =>
            this.getConnectionExecOutput(pinName, nodeId ?? node.id),
        });
      }

      currentNode = this.getExecNext(currentNode.id);
    }

    return codeText;
  }

  buildPinVarName(pinName: string, nodeId: string) {
    return `_${nodeId}_${pinName}`;
  }

  getConnectionInput(pinName: string, nodeId: string): string | null {
    const connection: ConnectInfo | undefined = this.connections.find(
      (item) => item.toNodeId === nodeId && item.toNodePinName === pinName
    );
    if (!connection) {
      return null;
    }

    const fromNode: CodeckNode | undefined =
      this.nodeMap[connection.fromNodeId];
    if (!fromNode) {
      return null;
    }

    // Hardcode for varget
    if (fromNode.name === VarGetNodeDefinition.name) {
      return fromNode.data?.name ?? '';
    }

    const fromNodeDef = this.nodeDefinition[fromNode.name];
    if (!fromNodeDef) {
      return null;
    }

    const outputDef = fromNodeDef.outputs.find(
      (output) => output.name === connection.fromNodePinName
    );
    if (!outputDef) {
      return null;
    }

    if (outputDef.code) {
      this.collectPrepare(fromNodeDef);

      // 自定义输出代码生成逻辑
      return (
        outputDef.code({
          node: fromNode,
          buildPinVarName: (pinName: string, nodeId?: string) =>
            this.buildPinVarName(pinName, nodeId ?? fromNode.id),
          getConnectionInput: (pinName: string, nodeId?: string) =>
            this.getConnectionInput(pinName, nodeId ?? fromNode.id),
          getConnectionExecOutput: (pinName: string, nodeId?: string) =>
            this.getConnectionExecOutput(pinName, nodeId ?? fromNode.id),
        }) ?? ''
      );
    } else {
      // 直接取值
      const pinVarName = this.buildPinVarName(
        connection.fromNodePinName,
        connection.fromNodeId
      );

      return pinVarName;
    }
  }

  getConnectionExecOutput(pinName: string, nodeId: string): string | null {
    const execNode = this.getExecNext(nodeId, pinName);
    if (!execNode) {
      return null;
    }

    return this.generateCodeFromNode(execNode);
  }

  generateVariable(): string {
    const list = values(this.variableMap);
    if (list.length === 0) {
      return '';
    }

    return (
      list
        .map((item) => {
          if (isUndefined(item.defaultValue)) {
            return `let ${item.name};`;
          } else {
            return `let ${item.name} = ${JSON.stringify(item.defaultValue)};`;
          }
        })
        .join('\n') + '\n\n'
    );
  }

  generatePrepareCode(): string {
    const imports: Record<string, [string, string][]> = {};
    const functions: CodeFunctionPrepare[] = [];

    this.prepares.forEach((item) => {
      if (item.type === 'import') {
        if (!imports[item.module]) {
          imports[item.module] = [];
        }

        if (item.member) {
          const member: [string, string] =
            typeof item.member === 'string'
              ? [item.member, item.member]
              : item.member;

          imports[item.module] = uniqBy(
            [...imports[item.module], member],
            (item) => item.join(':')
          );
        }
      }

      if (item.type === 'function') {
        functions.push(item);
      }
    });

    // generate code
    let prepareCode = '';
    const importEntries = Object.entries<[string, string][]>(imports);
    if (Array.isArray(importEntries) && importEntries.length > 0) {
      prepareCode +=
        importEntries
          .map(([module, members]) => {
            if (this.moduleType === 'commonjs') {
              // commonjs
              if (members.length === 0) {
                return `require('${module}');`;
              }

              return members
                .map((member) => {
                  if (member[0] === '*') {
                    return `const ${member[1]} = require('${module}');`;
                  } else {
                    return `const ${member[1]} = require('${module}').${member[0]};`;
                  }
                })
                .join('\n');
            } else {
              // esmodule
              if (this.useSkypack === true) {
                module = `https://cdn.skypack.dev/${module}`;
              }

              if (members.length === 0) {
                return `import '${module}';`;
              }

              return `import { ${members
                .map((member) => {
                  if (member[0] !== 'default' && member[0] === member[1]) {
                    return String(member);
                  } else {
                    return `${member[0]} as ${member[1]}`;
                  }
                })
                .join(', ')} } from '${module}';`;
            }
          })
          .join('\n') + '\n\n';
    }
    if (Array.isArray(functions) && functions.length > 0) {
      prepareCode +=
        functions
          .map(
            (func) =>
              `function ${func.name}(${func.parameters.join(', ')}) {
  ${formatFunctionIndent(func.body, 2)}
}`
          )
          .join('\n\n') + '\n\n';
    }

    return prepareCode;
  }

  private findBegin(): CodeckNode {
    const nodes = values(this.nodeMap).filter(
      (node) => this.nodeDefinition[node.name]?.type === 'begin'
    );

    if (nodes.length === 0) {
      throw new Error('Not found Begin node.');
    }

    if (nodes.length > 1) {
      throw new Error('Begin node should be only one');
    }

    return nodes[0];
  }

  private getExecNext(
    nodeId: string,
    pinName = STANDARD_PIN_EXEC_OUT
  ): CodeckNode | null {
    const node = this.nodeMap[nodeId];
    if (!node) {
      return null;
    }

    const execNextConnection = this.connections.filter(
      (conn) => conn.fromNodeId === nodeId && conn.fromNodePinName === pinName
    );
    if (execNextConnection.length === 0) {
      return null;
    }

    if (execNextConnection.length > 1) {
      throw new Error(
        `node ${nodeId} have more than one stardand exec connection`
      );
    }

    return this.nodeMap[execNextConnection[0].toNodeId] ?? null;
  }

  /**
   * 收集节点预备逻辑
   * @param nodeDef 节点定义
   */
  private collectPrepare(nodeDef: Pick<CodeckNodeDefinition, 'prepare'>) {
    if (Array.isArray(nodeDef.prepare) && nodeDef.prepare.length > 0) {
      this.prepares.push(...nodeDef.prepare);
    }
  }
}
