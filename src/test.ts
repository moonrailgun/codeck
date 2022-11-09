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
    bar: {
      id: 'bar',
      type: 'begin',
      name: 'begin',
      position: {
        x: 110,
        y: 110,
      },
    },
  },
});
