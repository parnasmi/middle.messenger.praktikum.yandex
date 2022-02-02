import {Block, compile} from "../../shared/utils";
import tmpl from './home.hbs';
import {Button} from "../../shared/components";
export class HomePage extends Block {
  constructor() {
    super('div');
  }

  render() {

    const button = new Button({
      title: 'Jump',
      events: {
        click: () => console.log('Clicked')
      }
    })

    setTimeout(() => {
      button.setProps({text: 'new button'})
    },1000)

    return compile(tmpl, {button:button })
  }
}
