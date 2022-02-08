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

const chatJsonItems = [
	{
		id:1,
		avatar: 'https://image.flaticon.com/icons/png/512/206/206853.png?w=826',
		from_user: 'Андрей',
		last_text_message: 'Изображение',
		date:'10:49',
		unread_count:4
	},
	{
		id:2,
		avatar: 'https://www.meme-arsenal.com/memes/bb75b90d2a8352bc97c507f96c0c795f.jpg',
		from_user: 'Ильхом',
		last_text_message: 'Друзья, у меня для вас особенный выпуск новостей особенный выпуск новостей!...',
		date:'10:49',
		unread_count:null
	},
	{
		id:2,
		avatar: 'https://dergipark.org.tr/zollu/images/default-avatar.png',
		from_user: 'Хандамир',
		last_text_message: 'Выбери шаблон чтобы',
		date:'10:49',
		unread_count:12
	}
]

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
