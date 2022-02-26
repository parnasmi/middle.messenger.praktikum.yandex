import {Block, closeModal} from "../../utils";
import tmpl from "./removeUserPopup.tmpl.hbs";
import { FormContainer } from "../FormContainer";
import { ChatController } from "../../modules/chat/chat.controller";
import { removeUserPopupJSON } from "./removeUserPopupJSON";
import store from "../../store";
import { IFormCallback } from "../../modules/types";

const chatController = new ChatController();

export class RemoveUserPopup extends Block {
	constructor() {
		super("div", {
			attributes: {
				class: "popup remove-user-popup",
			},
		});
		this.children.form = new FormContainer({
			inputs: removeUserPopupJSON,
			signFormModifierClass: "sign-form__fields_signup",
			buttonText: "Удалить",
			headingText: "Удалить пользователья чата",
			submitHandler: async (formData: { number: string }, cb: IFormCallback) => {
				const chatId = store.getState().selectedChat.id;
				await chatController.removeUser(chatId, Number(formData.number), cb);
			},
			successHandler: () => {
				closeModal('remove-user-popup')
			},
			errorHandler: () => {
				console.error("Error while adding user");
			},
		});
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
