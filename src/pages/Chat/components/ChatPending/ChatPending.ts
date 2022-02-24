import {Block} from "../../../../shared/utils";
import tmpl from './chatPending.tmpl.hbs'
export class ChatPending extends Block {
	constructor() {
		super('div', {
			attributes: {
				class: 'chat__content-pending flex items-justify-center'
			}
		});
	}
	render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
