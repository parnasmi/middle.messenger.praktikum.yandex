import {Block} from '../index';

export function render(selector: string, block:Block): Element | undefined {
  const root = document.querySelector(selector)!;
  if(!root) return;
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount()
  return root;
}
