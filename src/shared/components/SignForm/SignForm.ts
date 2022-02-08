import tmpl from './signForm.tmpl.hbs'
import {Form} from "../Form";
import {TextInputField} from "../TextInputField";
import {TextInputFieldTypes} from "../TextInputField/textInputField.types";
import {Block} from "../../utils";
import {Button} from "../Button";

type SignFormType = {
  inputs: TextInputFieldTypes[];
  attributes: {
    class: string;
  };
  signFormModifierClass: string;
  buttonText: string;
  linkText: string;
  link: string;
  headingText: string;
}

export class SignForm extends Form {
  buttonText:string;
  constructor({inputs,buttonText,...restProps}:SignFormType) {
    super({ ...restProps });
    this.buttonText = buttonText;
    this._generateInputs(inputs);
  }
  _onSend() {
    console.log('formData has been sent', this.formData)
  }
  private _generateInputs(inputs:any) {
    this.children.inputs = inputs.map((inputProps: TextInputFieldTypes, index:number):Block => {
      return new TextInputField({
        ...inputProps,
        textInput: {
          ...inputProps.textInput,
          events: {
            blur: (event: Event) => this._onFocus(index, event),
            focus: (event: Event) => this._onFocus(index,event),
          },
        },
      });

    });

    this.children.button = new Button({
      title: this.buttonText,
      attributes: { class: "block full-w sign-forms__main-btn", type: "submit" },
      events: {
        click: this._handleSubmit.bind(this)
      }
    });
  }
  render(): DocumentFragment {
    return this.compile(tmpl, this.props);
  }
}
