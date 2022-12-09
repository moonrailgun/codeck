import { CodeckNodePinDefinition } from '../store/node';
import { useNodeInfo } from './useNodeInfo';

/**
 * 获取Pin的定义
 */
export function usePinDefinition(
  nodeId: string,
  pinName: string
): CodeckNodePinDefinition | null {
  const { definition } = useNodeInfo(nodeId);

  if (!definition) {
    return null;
  }

  const pinDef =
    definition.inputs.find((input) => input.name === pinName) ??
    definition.outputs.find((output) => output.name === pinName) ??
    null;

  return pinDef;
}
