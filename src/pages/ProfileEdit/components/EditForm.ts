import tmpl from './editForm.tmpl.hbs'
import {Button, EditInputField, Form} from "../../../shared/components";
import {Block} from "../../../shared/utils";
import {EditInputFieldTypes} from "../../../shared/components/EditInputField/editInputField.types";
const userProfileFormFields:Record<string, EditInputFieldTypes> = {
  email: {
    textInput: {
      attributes: {
        type: "email",
        name: "email",
        placeholder: "Почта",
        required: true,
        value: ''
      }
    },
    errorMessage: {
      errorText: "Такой email существует",
      isShown: false,
      attributes: {
        class: 'profile__input-error'
      }
    },
    label: 'Почта'
  },
  login:{
    textInput: {
      attributes: {
        type: "text",
        name: "login",
        placeholder: "Логин",
        required: true,
        value: ''
      }
    },
    errorMessage: {
      errorText: "Такой логин существует",
      isShown: false,
      attributes: {
        class: 'profile__input-error'
      }
    },
    label: 'Логин'
  },
  first_name: {
    textInput: {
      attributes: {
        type: "text",
        name: "first_name",
        placeholder: "Имя",
        required: true,
        value: ''
      }
    },
    errorMessage: {
      errorText: "Обязателен для ввода",
      isShown: false,
      attributes: {
        class: 'profile__input-error'
      }
    },
    label: 'Имя'
  },
  second_name: {
    textInput: {
      attributes: {
        type: "text",
        name: "second_name",
        placeholder: "Фамилия",
        required: true,
        value: ''
      }
    },
    errorMessage: {
      errorText: "Обязателен для ввода",
      isShown: false,
      attributes: {
        class: 'profile__input-error'
      }
    },
    label: 'Фамилия'
  },
  phone: {
    textInput: {
      attributes: {
        type: "tel",
        name: "phone",
        placeholder: "Телефон",
        required: true,
        value: ''
      }
    },
    errorMessage: {
      errorText: "Обязателен для ввода",
      isShown: false,
      attributes: {
        class: 'profile__input-error'
      }
    },
    label: 'Телефон'
  },
  chat_name: {
    textInput: {
      attributes: {
        type: "text",
        name: "chat_name",
        placeholder: "Имя в чате",
        required: false,
        value: ''
      }
    },
    errorMessage: {
      errorText: "Необязателен для ввода",
      isShown: false,
      attributes: {
        class: 'profile__input-error'
      }
    },
    label: 'Имя в чате'
  }
}


export class EditForm extends Form {
  constructor(props:any) {
    const {userProfileData} = props;
    super(props);
    this._generateInputs(userProfileFormFields,userProfileData);
  }
  _onSend() {
    console.log('formData has been sent', this.formData)
  }
  private _generateInputs(inputs:any,userProfileData:any) {
    const formFieldsWithData = Object.keys(inputs).reduce((acc:any, curr:string) => {
      return [
        ...acc,
        {
          ...userProfileFormFields[curr],
          textInput:{
            attributes: {
              ...userProfileFormFields[curr].textInput.attributes,
              class: 'border-none profile-info__input text-right',
              value: userProfileData[curr],
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
