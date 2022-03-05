export const removeUserPopupJSON = [
	{
		textInput: {
			attributes: {
				type: "number",
				name: "number",
				placeholder: "id пользователя",
				required: true,
			},
		},
		errorMessage: {
			errorText: "введите id",
			isShown: false,
			attributes: {
				class: "sign-form__field-error",
			},
		},
	},
];
