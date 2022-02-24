import {Block} from "../../utils";
import tmpl from "./chatCreatePopup.tmpl.hbs";
import {FormContainer} from "../FormContainer";
import {createChatInputsJsonData} from "./createChatInputsJSON";
import {ChatController} from "../../modules/chat/chat.controller";

const chatController = new ChatController()

export class ChatCreatePopup extends Block {

  constructor() {
    super("div", {
      attributes: {
        class: "popup chat-create-popup",
      }
    });
    this.children.form = new FormContainer({
      inputs: createChatInputsJsonData,
      signFormModifierClass: "sign-form__fields_signup",
      buttonText: "Создать чат",
      headingText: "Создание нового чата",
      submitHandler: chatController.createChat,
    });
  }
  render(): DocumentFragment {
    return this.compile(tmpl, this.props);
  }
}
