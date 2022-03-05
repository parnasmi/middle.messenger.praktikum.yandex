import { IInput } from "../TextInput/textinput.types";
import { FormFieldErrorMsgType } from "../FormFieldErrorMsg/formFieldErrorMsg.type";

export type EditInputFieldTypes = {
	selfProps?: {
		attributes?: {
			class?: string;
		};
	};
	textInput: IInput;
	errorMessage: FormFieldErrorMsgType;
	label: string;
};
