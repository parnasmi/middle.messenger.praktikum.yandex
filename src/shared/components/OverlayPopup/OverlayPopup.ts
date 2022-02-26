import {Block} from "../../utils";
// import tmpl from './overlayPopup.tmpl.hbs';
export class OverlayPopup extends Block {
	constructor() {
		super("div", {
			attributes: {
				class: "overlay-popup",
			},
		});
	}

	render(): DocumentFragment {
		return new DocumentFragment()
	}
}
