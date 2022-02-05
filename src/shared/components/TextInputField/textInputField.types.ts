import {IInput} from "../TextInput/textinput.types";
import {FormFieldErrorMsgType} from "../FormFieldErrorMsg/formFieldErrorMsg.type";


export type TextInputFieldTypes = {
  selfProps?: {
    attributes?: {
      class?:string
    }
  },
  textInput: IInput,
  errorMessage:FormFieldErrorMsgType
}
