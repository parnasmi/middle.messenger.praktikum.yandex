import { EditInputFieldTypes } from "../../../shared/components/EditInputField/editInputField.types";
export const userProfileFormFields: Record<string, EditInputFieldTypes> = {
	email: {
		textInput: {
			attributes: {
				type: "email",
				name: "email",
				placeholder: "Почта",
				required: true,
				value: "",
			},
		},
		errorMessage: {
			errorText: "Такой email существует",
			isShown: false,
			attributes: {
				class: "profile__input-error",
			},
		},
		label: "Почта",
	},
	login: {
		textInput: {
			attributes: {
				type: "text",
				name: "login",
				placeholder: "Логин",
				required: true,
				value: "",
			},
		},
		errorMessage: {
			errorText: "Такой логин существует",
			isShown: false,
			attributes: {
				class: "profile__input-error",
			},
		},
		label: "Логин",
	},
	first_name: {
		textInput: {
			attributes: {
				type: "text",
				name: "first_name",
				placeholder: "Имя",
				required: true,
				value: "",
			},
		},
		errorMessage: {
			errorText: "Обязателен для ввода",
			isShown: false,
			attributes: {
				class: "profile__input-error",
			},
		},
		label: "Имя",
	},
	second_name: {
		textInput: {
			attributes: {
				type: "text",
				name: "second_name",
				placeholder: "Фамилия",
				required: true,
				value: "",
			},
		},
		errorMessage: {
			errorText: "Обязателен для ввода",
			isShown: false,
			attributes: {
				class: "profile__input-error",
			},
		},
		label: "Фамилия",
	},
	phone: {
		textInput: {
			attributes: {
				type: "tel",
				name: "phone",
				placeholder: "Телефон",
				required: true,
				value: "",
			},
		},
		errorMessage: {
			errorText: "Обязателен для ввода",
			isShown: false,
			attributes: {
				class: "profile__input-error",
			},
		},
		label: "Телефон",
	},
	display_name: {
		textInput: {
			attributes: {
				type: "text",
				name: "display_name",
				placeholder: "Имя в чате",
				required: false,
				value: "",
			},
		},
		errorMessage: {
			errorText: "Необязателен для ввода",
			isShown: false,
			attributes: {
				class: "profile__input-error",
			},
		},
		label: "Имя в чате",
	},
};
