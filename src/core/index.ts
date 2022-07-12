import { TaichuNode } from './node';

interface TaichuModuleMap {
  [module: string]: {
    nodes: TaichuNode[];
  };
}

interface TaichuNodeTemplate {
  inputs: TaichuPort[];
  outputs: TaichuPort[];

  /**
   * 唯一名称
   */
  name: string;

  tag: string;

  props: {};
}

interface TaichuPort {
  html: string;
}

type TaichuRender = (tag: string, props: {}) => void;

export class Taichu {
  modules: TaichuModuleMap = {
    Main: {
      nodes: [],
    },
  };

  currentModule = 'Main';

  registeredNodeTemplate: Record<string, TaichuNodeTemplate> = {};

  constructor(public render: TaichuRender) {}

  get currentModuleData() {
    return this.modules[this.currentModule];
  }

  /**
   * 挂载容器
   */
  mount(el: Element) {
    const node = document.createElement('div');
    node.className = '__taichu_root__';

    el.appendChild(node);
  }

  /**
   * 注册节点
   */
  registryNode(node: TaichuNodeTemplate) {
    if (this.registeredNodeTemplate[node.name]) {
      console.warn('不允许重复注册');
      return;
    }
    this.registeredNodeTemplate[node.name] = node;
  }

  /**
   * 添加节点
   */
  addNode(name: string) {
    const template = this.registeredNodeTemplate[name];
    if (!template) {
      console.warn('没有找到该节点');
      return;
    }

    const node = new TaichuNode(this);
    this.currentModuleData.nodes.push(node);
  }
}
