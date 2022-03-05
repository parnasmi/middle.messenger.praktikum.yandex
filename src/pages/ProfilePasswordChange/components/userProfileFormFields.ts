import { EditInputFieldTypes } from "../../../shared/components/EditInputField/editInputField.types";

export const userProfileFormFields: Record<string, EditInputFieldTypes> = {
	oldPassword: {
		textInput: {
			attributes: {
				type: "password",
				name: "oldPassword",
				placeholder: "Старый пароль",
				required: true,
				value: "",
			},
		},
		errorMessage: {
			errorText: "Неправильный пароль",
			isShown: false,
			attributes: {
				class: "profile__input-error",
			},
		},
		label: "Старый пароль",
	},
	newPassword: {
		textInput: {
			attributes: {
				type: "password",
				name: "newPassword",
				placeholder: "Новый пароль",
				required: true,
				value: "",
			},
		},
		errorMessage: {
			errorText: "Неправильный пароль",
			isShown: false,
			attributes: {
				class: "profile__input-error",
			},
		},
		label: "Новый пароль",
	},
	retypePassword: {
		textInput: {
			attributes: {
				type: "password",
				name: "retypePassword",
				placeholder: "Повторите новый пароль",
				required: true,
				value: "",
			},
		},
		errorMessage: {
			errorText: "Неправильный пароль",
			isShown: false,
			attributes: {
				class: "profile__input-error",
			},
		},
		label: "Повторите новый пароль",
	},
};
