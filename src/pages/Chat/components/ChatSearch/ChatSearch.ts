import {Block} from "../../../../shared/utils";
import tmpl from './chatSearch.tmpl.hbs'
import {ChatSearchTypes} from "./chatSearch.types";
const searchIcon = new URL('../../../../assets/img/icon-search.svg', import.meta.url);
export class ChatSearch extends Block {
  constructor(props:ChatSearchTypes) {
    super('div', {
      attributes: {
        class: 'chat__search full-w relative'
      },
      input: new Block('input', {
        attributes: {
          class: 'chat__search-input border-none full-w block',
          type: 'search',
          placeholder: 'Поиск'
        },
        ...props
      }),
      searchIcon
    })
  }

  render(): DocumentFragment {
    return this.compile(tmpl, this.props)
  }
}
