import { useNodeStore } from './store/node';

/**
 * 测试数据
 */

useNodeStore.setState({
  nodeMap: {
    foo: {
      id: 'foo',
      name: 'begin',
      position: {
        x: 10,
        y: 10,
      },
    },
    bar: {
      id: 'bar',
      name: 'begin',
      position: {
        x: 110,
        y: 110,
      },
    },
    baz: {
      id: 'baz',
      name: 'log',
      position: {
        x: 210,
        y: 210,
      },
    },
  },
});
