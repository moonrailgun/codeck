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
      name: 'log',
      position: {
        x: 210,
        y: 210,
      },
    },
    baz: {
      id: 'baz',
      name: 'varget',
      position: {
        x: 110,
        y: 110,
      },
    },
    foz: {
      id: 'foz',
      name: 'varset',
      position: {
        x: 410,
        y: 210,
      },
    },
  },
});
