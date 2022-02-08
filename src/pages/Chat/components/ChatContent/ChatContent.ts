import {Block} from "../../../../shared/utils";
import tmpl from './chatContent.tmpl.hbs'
import {ChatContentHeader} from "../ChatContentHeader";
import {ChatContentInputs} from "../ChatContentInputs";
import {ChatContentMessages} from "../ChatContentMessages";


export class ChatContent extends Block {
	constructor() {
		const chatContentHeader = new ChatContentHeader();
		const chatContentInputs = new ChatContentInputs()
		const chatContentMessages = new ChatContentMessages()

		super("div", {
			attributes: {
				class: "chat__content flex-grow-1 flex",
			},
      children: {
        chatContentHeader,
				chatContentInputs,
				chatContentMessages
      }
		});
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
