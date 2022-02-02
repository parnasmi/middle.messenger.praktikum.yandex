import {Block} from "../../utils";
// import tmpl from './Input.hbs'
import {IInput} from "./textinput.types";
export class TextInput extends Block {
  constructor(props: IInput) {
    super('input', props);
  }
  render():DocumentFragment {
    return new DocumentFragment()
  }
}
