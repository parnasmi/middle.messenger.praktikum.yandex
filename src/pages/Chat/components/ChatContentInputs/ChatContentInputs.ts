import { Block } from "../../../../shared/utils";
import tmpl from "./chatContentInputs.tmpl.hbs";
import { ChatInputFormControl } from "../ChatInputFormControl";

export class ChatContentInputs extends Block {
	constructor() {
		const chatInputControls = new ChatInputFormControl();
		super("footer", {
			attributes: {
				class: "chat__content-input-control",
			},
			chatInputControls,
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
