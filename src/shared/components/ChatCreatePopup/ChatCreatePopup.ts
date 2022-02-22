import {Block} from "../../utils";
import tmpl from "./chatCreatePopup.tmpl.hbs";
// import { ProfileController } from "../../modules/profile";
import {FormContainer} from "../FormContainer";
import {createChatInputsJsonData} from "./createChatInputsJSON";
import {ChatController} from "../../modules/chat/chat.controller";
// import {ChatCreateFormType} from "../../modules/http/http.types";

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
      submitHandler: chatController.createChat
    });
  }

  // private handleSubmit(formData: ChatCreateFormType) {
  //   const that = this
  //   chatController.createChat(formData, {
  //     success: (data: any) => {
  //       console.log('chat successfully created', data)
  //     },
  //     error: (error) => {
  //       console.error('chat create error', (error as any).reason);
  //       console.log('this, that', {'this':this, that})
  //       // this.setProps({apiErrorText:(error as any).reason })
  //       // this.sh
  //     }
  //   })
  //   console.log('create chatFormdata', formData)
  // }

  render(): DocumentFragment {
    return this.compile(tmpl, this.props);
  }
}
