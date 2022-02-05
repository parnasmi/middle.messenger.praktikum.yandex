import {Block, compile} from "../../utils";
import tmpl from './button.hbs'
import {IButton} from "./button.types";
export class Button extends Block {
  constructor(props: IButton) {
    super('button', {
      ...props,
      attributes: {
        ...props.attributes,
        class: `btn ${props.attributes?.class}`,
      },
    });
  }
  render() {
    return compile(tmpl, this.props)
  }
}
