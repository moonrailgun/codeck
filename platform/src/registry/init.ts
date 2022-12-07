import { pick } from 'lodash-es';
import { initMiniStar, regDependency } from 'mini-star';

const registry = [
  {
    name: 'easemob',
    label: '环信',
    url: './plugins/easemob/index.js',
  },
];

export async function initRegistry() {
  regDependency('codeck', () => import('codeck'));

  await initMiniStar({
    plugins: registry.map((r) => pick(r, ['name', 'url'])),
  });
}
