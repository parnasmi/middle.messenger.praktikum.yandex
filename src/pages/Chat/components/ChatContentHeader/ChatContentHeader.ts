import {Block} from "../../../../shared/utils";
import tmpl from './chatContentHeader.tmpl.hbs'
export class ChatContentHeader extends Block {
	constructor() {
		super("header", {
			attributes: {
				class: 'chat__content-header flex justify-between'
			}
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
