import tmpl from './passwordChangeForm.tmpl.hbs'
import {Button, EditInputField, Form} from "../../../shared/components";
import {Block} from "../../../shared/utils";
import {EditInputFieldTypes} from "../../../shared/components/EditInputField/editInputField.types";
const userProfileFormFields:Record<string, EditInputFieldTypes> = {
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


export class PasswordChangeForm extends Form {
  constructor(props:any) {
    // const {userProfileData} = props;
    super(props);
    this._generateInputs(userProfileFormFields);
  }
  _onSend() {
    console.log('formData has been sent', this.formData)
  }
  private _generateInputs(inputs:any) {
    const formFieldsWithData = Object.keys(inputs).reduce((acc:any, curr:string) => {
      return [
        ...acc,
        {
          ...userProfileFormFields[curr],
          textInput:{
            attributes: {
              ...userProfileFormFields[curr].textInput.attributes,
              class: 'border-none profile-info__input text-right',
            }
          }
        }
      ]
    },[]);


    this.children.inputs = formFieldsWithData.map((dataItem, index):Block => {
      return new EditInputField({
        ...dataItem,
        textInput: {
          ...dataItem.textInput,
          hasDefaultClass:false,
          events: {
            blur: (event: Event) => this._onFocus(index, event),
            focus: (event: Event) => this._onFocus(index,event),
          }
        }
      })
    })

    this.children.saveButton = new Button({
      title: 'Сохранить',
      attributes: { class: "full-w", type: "submit" },
      events: {
        click: () => console.log('data saved')
      }
    });

  }
  render(): DocumentFragment {
    return this.compile(tmpl, this.props);
  }
}
