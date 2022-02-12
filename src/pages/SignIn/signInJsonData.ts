 export const signInJsonData = [
  {
    selfProps: {
      attributes: {
        class: "",
      },
    },
    textInput: {
      attributes: {
        class: "sign-form__input",
        type: "email",
        name: "login",
        placeholder: "Логин",
        required: true,
      },
    },
    errorMessage: {
      errorText: "Неверный логин",
      isShown: false,
      attributes: {
        class: "sign-form__field-error",
      },
    },
  },
  {
    selfProps: {
      attributes: {
        class: "",
      },
    },
    textInput: {
      attributes: {
        class: "sign-form__input",
        type: "password",
        name: "password",
        placeholder: "Пароль",
        required: true,
      },
    },
    errorMessage: {
      errorText: "Неверный пароль",
      isShown: false,
      attributes: {
        class: "sign-form__field-error",
      },
    },
  },
]
