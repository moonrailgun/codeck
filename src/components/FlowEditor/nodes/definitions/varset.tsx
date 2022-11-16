import { useNodeData } from '../../../../hooks/useNodeData';
import { TaichuNodeDefinition } from '../../../../store/node';
import {
  DEFAULT_CORE_CATEGORY,
  STANDARD_PIN_EXEC_IN,
  STANDARD_PIN_EXEC_OUT,
} from '../../../../utils/consts';
import { BaseNode } from '../BaseNode';
import { PinLabel } from '../pin/Label';

export const VarSetNodeDefinition: TaichuNodeDefinition = {
  name: 'varset',
  label: 'Set Variable',
  type: 'function',
  component: BaseNode,
  width: 150,
  height: 65,
  category: DEFAULT_CORE_CATEGORY,
  hidden: true,
  inputs: [
    {
      name: STANDARD_PIN_EXEC_IN,
      type: 'exec',
      position: {
        x: 14,
        y: 16,
      },
    },
    {
      name: 'variable',
      type: 'port',
      position: {
        x: 14,
        y: 50,
      },
      component: ({ nodeId }) => {
        const { name } = useNodeData(nodeId);

        return <PinLabel x={34} y={44} label={name} />;
      },
    },
  ],
  outputs: [
    {
      name: STANDARD_PIN_EXEC_OUT,
      type: 'exec',
      position: {
        x: 136,
        y: 16,
      },
    },
  ],
};
