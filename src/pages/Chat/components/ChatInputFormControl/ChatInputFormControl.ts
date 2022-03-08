import { Form, TextInput } from "../../../../shared/components";
import tmpl from "./chatInputFormControl.tmpl.hbs";
import { websocket } from "../../../../shared/utils";

export class ChatInputFormControl extends Form<{ message: string }> {
	constructor() {
		const messageInput = new TextInput({
			hasDefaultClass: false,
			attributes: {
				class: "full-w chat__content-input",
				name: "message",
				autocomplete: "off",
			},
			events: {
				input: (e) => {
					this.formData["message"] = (e.target as HTMLInputElement).value;
				},
			},
		});
		super({
			attributes: {
				class: "flex justify-between items-center",
			},
		});
		this.children.messageInput = messageInput;
	}

	_onSend() {
		console.log("on message sending", this.formData);
		websocket.sendMessage({ type: "message", content: this.formData.message });
		const input = document.querySelector(".chat__content-input");
		this.formData.message = "";
		(input as HTMLInputElement).value = "";
	}

	_customValidation() {
		if (this.formData.message.trim().length === 0) return;
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
