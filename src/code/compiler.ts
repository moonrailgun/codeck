import { values } from 'lodash-es';
import { ConnectInfo } from '../store/connection';
import { TaichuNode, TaichuNodeDefinition } from '../store/node';
import { STANDARD_PIN_EXEC_OUT } from '../utils/consts';

export class CodeCompiler {
  constructor(
    public nodeMap: Record<string, TaichuNode>,
    public nodeDefinition: Record<string, TaichuNodeDefinition>,
    public connections: ConnectInfo[]
  ) {}

  /**
   * 生成代码
   */
  generate() {
    const begin = this.findBegin();
    let codeText = '';
    let currentNode: TaichuNode | null = this.getExecNext(begin.id);

    while (currentNode !== null) {
      const codeFn = this.nodeDefinition[currentNode.name].code;
      if (codeFn) {
        const node = currentNode;
        codeText += codeFn({
          node,
          buildPinVarName: (pinName) => {
            return `_${node.id}_${pinName}`;
          },
        });
      }

      currentNode = this.getExecNext(currentNode.id);
    }

    return codeText;
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
