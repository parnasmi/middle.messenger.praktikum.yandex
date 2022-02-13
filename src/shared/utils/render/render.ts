import {Block} from '../index';

export function render(selector: string, block:Block): Element | undefined {
  const root = document.querySelector(selector)!;
  console.log('in render function', {selector, root, block})
  if(!root) return;
  root.innerHTML = '';
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount()
  return root;
}
