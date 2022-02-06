import tmpl from './signForm.tmpl.hbs'
import {Form} from "../Form";
// import {TextInputFieldTypes} from "../TextInputField/textInputField.types";
import {TextInputField} from "../TextInputField";

export class SignForm extends Form {

  constructor(props:any) {
    super({ ...props, TextInputField });
  }
  _onSend() {
    console.log('formData has been sent', this.formData)
  }
  render(): DocumentFragment {
    return this.compile(tmpl, this.props);
  }
}
