import {EditInputFieldTypes} from "../../../shared/components/EditInputField/editInputField.types";

export const userProfileFormFields:Record<string, EditInputFieldTypes> = {
  old_password: {
    textInput: {
      attributes: {
        type: "password",
        name: "old_password",
        placeholder: "Старый пароль",
        required: true,
        value: ''
      }
    },
    errorMessage: {
      errorText: "Неправильный пароль",
      isShown: false,
      attributes: {
        class: 'profile__input-error'
      }
    },
    label: 'Старый пароль'
  },
  new_password: {
    textInput: {
      attributes: {
        type: "password",
        name: "new_password",
        placeholder: "Новый пароль",
        required: true,
        value: ''
      }
    },
    errorMessage: {
      errorText: "Неправильный пароль",
      isShown: false,
      attributes: {
        class: 'profile__input-error'
      }
    },
    label: 'Новый пароль'
  },
  retype_password: {
    textInput: {
      attributes: {
        type: "password",
        name: "old_password",
        placeholder: "Повторите новый пароль",
        required: true,
        value: ''
      }
    },
    errorMessage: {
      errorText: "Неправильный пароль",
      isShown: false,
      attributes: {
        class: 'profile__input-error'
      }
    },
    label: 'Повторите новый пароль'
  },
}
