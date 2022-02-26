export const createChatInputsJsonData = [
  {
    textInput: {
      attributes: {
        type: "text",
        name: "title",
        placeholder: "Название чата",
        required: true,
      }
    },
    errorMessage: {
      errorText: "Ошибка в название",
      isShown: false,
      attributes: {
        class: "sign-form__field-error",
      },
    },
  }
]
