import { Block } from "../../utils";
import tmpl from "./addUserPopup.tmpl.hbs";
import { FormContainer } from "../FormContainer";
import { ChatController } from "../../modules/chat/chat.controller";
import { addUserPopupJSON } from "./addUserPopupJSON";
import store from "../../store";
import { IFormCallback } from "../../modules/types";

const chatController = new ChatController();

export class AddUserPopup extends Block {
	constructor() {
		super("div", {
			attributes: {
				class: "popup add-user-popup",
			},
		});
		this.children.form = new FormContainer({
			inputs: addUserPopupJSON,
			signFormModifierClass: "sign-form__fields_signup",
			buttonText: "Добавить",
			headingText: "Добавить пользователя в чат",
			submitHandler: async (formData: { number: string }, cb: IFormCallback) => {
				const chatId = store.getState().selectedChat.id;
				await chatController.addUser(chatId, Number(formData.number), cb);
			},
			successHandler: () => {
				AddUserPopup.closeModal()
			},
			errorHandler: () => {
				console.error("Error while adding user");
			},
		});
	}

	private static closeModal() {
		const popup = document.querySelector(".add-user-popup") as HTMLElement;
		const overlay = document.querySelector(".overlay-popup") as HTMLElement;

		popup.classList.remove("active");
		overlay.classList.remove("active");
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
