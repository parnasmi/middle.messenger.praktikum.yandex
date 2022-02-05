import {Block} from "../../utils";
import {TextInputField} from "../TextInputField";
import {Button} from "../Button";
import tmpl from './signForm.hbs'
import {TextInputFieldTypes} from "../TextInputField/textInputField.types";

type ValidationType = {
  name: string;
  value: string;
}
export class SignForm extends Block {
  buttonText:string;
  private formData: Record<string, string>;
  private formInputPatterns: Record<string, RegExp>;

  constructor(props: any) {
    const { inputs,buttonText,...restProps } = props;
    super("form", {
      ...restProps,
      events: {
        submit: (event: Event) => {
          event.preventDefault()
          this._onSend()
        },
      }
    });
    this.buttonText = buttonText;
    this._generateInputs(inputs);

    this.formData = {}

    this.formInputPatterns = {
      login:/\S+@\S+\.\S+/,
      password:/^(?=.*\d)[0-9a-zA-Z]{8,}$/,
    }
  }

  _generateInputs(inputs:any) {
    this.children.inputs = inputs.map((inputProps: TextInputFieldTypes, index:number):Block => {
      const input = new TextInputField({
        ...inputProps,
        textInput: {
          ...inputProps.textInput,
          events: {
            blur: (event: Event) => this._onFocus(index, event),
            focus: (event: Event) => this._onFocus(index,event),
          },
        },
      });

      return input;
    });

    this.children.button = new Button({
      title: this.buttonText,
      attributes: { class: "block full-w sign-forms__main-btn", type: "submit" },
      events: {
        click: this._onSend.bind(this)
      }
    });
  }

  private _onSend() {
    const isValid = Object.entries(this.formData).every(([key, value]) => this._validate({ name:key, value }))

    if(isValid) {
      console.log( 'Valid form data',this.formData)
      return;
    }
    console.error('form is not valid',this.formData)
  }

  private _onFocus(index:number, event:Event) {
    const input = event.target as HTMLInputElement;
    const { name, value } = input;
    this.formData[name] = value
    const isValid = this._validate({ name, value })

    if (!isValid) {
      this._showError(index);
      return
    }
    this._hideError(index);
  }


  private _showError(index:number) {
    const inputs = this.children.inputs as TextInputField[];
    inputs[index].validateInput(false);
  }

  private _hideError(index:number) {
    const inputs = this.children.inputs as TextInputField[];
    inputs[index].validateInput(true)
  }

  private _validate({name,value}:ValidationType):boolean {
    return this.formInputPatterns[name].test(value)
  }

  render(): DocumentFragment {
    return this.compile(tmpl, this.props);
  }
}
