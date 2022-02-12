import {Block} from "../../../../shared/utils";
import tmpl from './chatContentInputs.tmpl.hbs';

export class ChatContentInputs extends Block {
	constructor() {
		super("footer", {
			attributes: {
				class: 'chat__content-input-control'
			}
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
