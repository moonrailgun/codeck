import { useNodeStore } from './store/node';

/**
 * 测试数据
 */

useNodeStore.setState({
  nodeMap: {
    foo: {
      id: 'foo',
      type: 'begin',
      name: 'begin',
      position: {
        x: 10,
        y: 10,
      },
    },
  },
});
