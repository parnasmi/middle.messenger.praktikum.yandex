export const signUpJsonData = [
  {
    textInput: {
      attributes: {
        type: "email",
        name: "email",
        placeholder: "Почта",
        required: true,
      }
    },
    errorMessage: {
      errorText: "Проверьте формат email а",
      isShown: false,
      attributes: {
        class: "sign-form__field-error",
      },
    },
  },
  {
    textInput: {
      attributes: {
        type: "text",
        name: "login",
        placeholder: "Логин",
        required: true,
      }
    },
    errorMessage: {
      errorText: "Логин не должен включать числа",
      isShown: false,
      attributes: {
        class: "sign-form__field-error",
      },
    },
  },
  {
    textInput: {
      attributes: {
        type: "text",
        name: "first_name",
        placeholder: "Имя",
        required: true,
      }
    },
    errorMessage: {
      errorText: "Обязателен для ввода",
      isShown: false,
      attributes: {
        class: "sign-form__field-error",
      }
    },
  },
  {
    textInput: {
      attributes: {
        type: "text",
        name: "second_name",
        placeholder: "Фамилия",
        required: true,
      }
    },
    errorMessage: {
      errorText: "Обязателен для ввода",
      isShown: false,
      attributes: {
        class: "sign-form__field-error",
      }
    },
  },
  {
    textInput: {
      attributes: {
        type: "tel",
        name: "phone",
        placeholder: "Телефон",
        required: true,
      }
    },
    errorMessage: {
      errorText: "Обязателен для ввода",
      isShown: false,
      attributes: {
        class: "sign-form__field-error",
      }
    },
  },
  {
    textInput: {
      attributes: {
        type: "password",
        name: "password",
        placeholder: "Пароль",
        required: false,
      }
    },
    errorMessage: {
      errorText: "Обязателен для ввода",
      isShown: false,
      attributes: {
        class: "sign-form__field-error",
      }
    },
  },
  {
    textInput: {
      attributes: {
        type: "password",
        name: "retypePassword",
        placeholder: "Пароль еще раз",
        required: false,
      }
    },
    errorMessage: {
      errorText: "Обязателен для ввода",
      isShown: false,
      attributes: {
        class: "sign-form__field-error",
      }
    },
  }
]
