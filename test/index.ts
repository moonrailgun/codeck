import '../src/components/my-element';
import { Taichu } from '../src/index';

const taichu = new Taichu((tag, props) => {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    el.attributes[key] = value;
  }

  return el;
});
console.log('taichu', taichu);
