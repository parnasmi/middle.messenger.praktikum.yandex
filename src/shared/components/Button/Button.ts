import {Block, compile} from "../../utils";
import tmpl from './button.hbs'
import {IButton} from "./button.types";
export class Button extends Block {
  constructor(props: IButton) {
    super('button', {
      ...props,
      attributes: {
        class: `btn ${props.attributes?.class}`,
        ...props.attributes
      }
    });
  }
  render() {
    return compile(tmpl, this.props)
  }
}
