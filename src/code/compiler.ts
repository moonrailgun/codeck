import { isUndefined, values } from 'lodash-es';
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
      if (codeFn) {
        const node = currentNode;
        const buildPinVarName = (pinName: string, nodeId?: string) => {
          return `_${nodeId ?? node.id}_${pinName}`;
        };
        const getConnectionInput = (
          pinName: string,
          nodeId: string
        ): string | null => {
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

          const fromNodeDef = this.nodeDefinition[fromNode.name];
          if (!fromNodeDef) {
            return null;
          }

          return (
            fromNodeDef.code?.({
              node: fromNode,
              buildPinVarName,
              getConnectionInput: (pinName: string, nodeId?: string) =>
                getConnectionInput(pinName, nodeId ?? fromNode.id),
            }) ?? ''
          );

          // return this.nodeMap[]
        };
        codeText += codeFn({
          node,
          buildPinVarName,
          getConnectionInput: (pinName: string, nodeId?: string) =>
            getConnectionInput(pinName, nodeId ?? node.id),
        });
      }

      currentNode = this.getExecNext(currentNode.id);
    }

    return codeText;
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
