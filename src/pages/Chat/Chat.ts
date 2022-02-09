import {Block} from "../../shared/utils";
import tmpl from './chat.tmpl.hbs'
import {base} from '../../shared/views/layouts'
const layouts = require('handlebars-layouts');
import '../../scss/styles.scss'
import '../../scss/pages/chat/index.scss'
import {ChatContent, ChatSidebar} from "./components";
const searchIcon = new URL('../../assets/img/icon-search.svg', import.meta.url);
import handlebars from "handlebars/dist/handlebars.runtime";
// Register helpers
handlebars.registerHelper(layouts(handlebars));
// Register partials
handlebars.registerPartial('layout', base);
import {chatJsonItems} from './chatJsonItems'

export class Chat extends Block {
	constructor() {
		const chatSidebar = new ChatSidebar({chatItems:chatJsonItems})
		const chatContent = new ChatContent()
		super("main", {
			attributes: {
				class: "full-h-w",
			},
			searchIcon: searchIcon,
			children: {
				chatSidebar,
				chatContent
			}
		});
		document.body.className = "chat-page h-screen w-screen";
		document.title = 'Chat'
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
