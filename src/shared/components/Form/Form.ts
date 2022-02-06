import {Block} from "../../utils";
import {TextInputFieldTypes} from "../TextInputField/textInputField.types";
import {TextInputField} from "../TextInputField";
import {Button} from "../Button";

type ValidationType = {
  name: string;
  value: string;
}

export class Form extends Block {
  buttonText:string;
  protected formData: Record<string, string>;
  private formInputPatterns: Record<string, RegExp>;

  constructor(props: any) {
    const { inputs,buttonText,...restProps } = props;
    super("form", {
      ...restProps,
      events: {
        submit: (event: Event) => {
          event.preventDefault()
          this._handleSubmit()
        },
      }
    });
    this.buttonText = buttonText;
    this._generateInputs(inputs);

    this.formData = {}

    this.formInputPatterns = {
      login:/\S+@\S+\.\S+/,
      email:/\S+@\S+\.\S+/,
      password:/^(?=.*\d)[0-9a-zA-Z]{8,}$/,
      'retype-password':/^(?=.*\d)[0-9a-zA-Z]{8,}$/,
      first_name:/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      second_name:/^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/,
      phone:/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
    }
  }//constructor

  protected _generateInputs(inputs:any) {
    this.children.inputs = inputs.map((inputProps: TextInputFieldTypes, index:number):Block => {
      const input = new this.props.TextInputField({
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
        click: this._handleSubmit.bind(this)
      }
    });
  }

  private _handleSubmit() {
    const isValid = Object.keys(this.formData).length && Object.entries(this.formData).every(([key, value]) => this._validate({ name:key, value }))
    console.log('isValid',isValid)
    if(isValid) {
      console.log( 'Valid form data',this.formData)
      this._onSend()
      return;
    }
    console.error('form is not valid',this.formData)

  }

  protected _onSend() {}

  protected _onFocus(index:number, event:Event) {
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

  protected _showError(index:number) {
    const inputs = this.children.inputs as TextInputField[];
    inputs[index].validateInput(false);
  }

  protected _hideError(index:number) {
    const inputs = this.children.inputs as TextInputField[];
    inputs[index].validateInput(true)
  }

  protected _validate({name,value}:ValidationType):boolean {
    return this.formInputPatterns[name].test(value)
  }
}
