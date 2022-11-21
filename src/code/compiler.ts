import { isUndefined, values } from 'lodash-es';
import { VarGetNodeDefinition } from '../components/FlowEditor/nodes/definitions/varget';
import { ConnectInfo, useConnectionStore } from '../store/connection';
import { TaichuNode, useNodeStore } from '../store/node';
import { useVariableStore } from '../store/variable';
import { STANDARD_PIN_EXEC_OUT } from '../utils/consts';

export class CodeCompiler {
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
    let currentNode: TaichuNode | null = this.getExecNext(begin.id);

    codeText += this.generateVariable() + '\n\n';

    // 主流程代码
    while (currentNode !== null) {
      const codeFn = this.nodeDefinition[currentNode.name].code;
      const node = currentNode;
      if (codeFn) {
        const buildPinVarName = (pinName: string, nodeId?: string) => {
          return this.buildPinVarName(pinName, nodeId ?? node.id);
        };

        codeText += codeFn({
          node,
          buildPinVarName,
          getConnectionInput: (pinName: string, nodeId?: string) =>
            this.getConnectionInput(pinName, nodeId ?? node.id),
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

    const fromNode: TaichuNode | undefined =
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
      // 自定义输出代码生成逻辑
      return (
        outputDef.code({
          node: fromNode,
          buildPinVarName: (pinName: string, nodeId?: string) =>
            this.buildPinVarName(pinName, nodeId ?? fromNode.id),
          getConnectionInput: (pinName: string, nodeId?: string) =>
            this.getConnectionInput(pinName, nodeId ?? fromNode.id),
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

  generateVariable(): string {
    const list = values(this.variableMap);
    return list
      .map((item) => {
        if (isUndefined(item.defaultValue)) {
          return `let ${item.name};`;
        } else {
          return `let ${item.name} = ${JSON.stringify(item.defaultValue)};`;
        }
      })
      .join('\n');
  }

  private findBegin(): TaichuNode {
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

  private getExecNext(nodeId: string): TaichuNode | null {
    const node = this.nodeMap[nodeId];
    if (!node) {
      return null;
    }

    const execNextConnection = this.connections.filter(
      (conn) =>
        conn.fromNodeId === nodeId &&
        conn.fromNodePinName === STANDARD_PIN_EXEC_OUT
    );
    if (execNextConnection.length === 0) {
      return null;
    }

    if (execNextConnection.length > 1) {
      throw new Error(
        `node ${nodeId} have more than one stardand exec connection`
      );
    }

    return this.nodeMap[execNextConnection[0].toNodeId];
  }
}
