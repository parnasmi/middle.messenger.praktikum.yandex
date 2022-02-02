import {Block} from '../index';

// export function render(selector: string, blocks:Block[]): Element | undefined {
export function render(selector: string, block:Block): Element | undefined {
  const root = document.querySelector(selector)!;
  if(!root) return;
  // blocks.forEach((block) => {
  //   root.appendChild(block.getContent());
  // })
    root.appendChild(block.getContent());

  return root;
}
