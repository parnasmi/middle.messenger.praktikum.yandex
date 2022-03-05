import { Block } from "../index";

export function render(selector: string, block: Block): Element | undefined {
	const root = document.querySelector(selector)!;
	if (!root) return;
	root.innerHTML = "";
	root.appendChild(block.getContent());

	if (typeof block.dispatchComponentDidMount === "function") {
		block.dispatchComponentDidMount();
	}
	return root;
}
