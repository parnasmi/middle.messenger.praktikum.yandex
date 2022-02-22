import { Block } from "../../shared/utils";
import tmpl from "./chat.tmpl.hbs";
import { base } from "../../shared/views/layouts";

const layouts = require("handlebars-layouts");
import "../../scss/styles.scss";
import "../../scss/pages/chat/index.scss";
import { ChatContent, ChatSidebar } from "./components";

const searchIcon = new URL("../../assets/img/icon-search.svg", import.meta.url);
import handlebars from "handlebars/dist/handlebars.runtime";
// Register helpers
handlebars.registerHelper(layouts(handlebars));
// Register partials
handlebars.registerPartial("layout", base);
import { chatJsonItems } from "./chatJsonItems";
import {OverlayPopup} from "../../shared/components/OverlayPopup";

export class Chat extends Block<{}> {
	constructor() {
		const chatSidebar = new ChatSidebar({ chatItems: chatJsonItems });
		const chatContent = new ChatContent();
		const overlayPopup = new OverlayPopup();
		super("main", {
			attributes: {
				class: "full-h-w chat-page",
			},
			searchIcon: searchIcon,
			children: {
				chatSidebar,
				chatContent,
				overlayPopup,
			},
		});
		document.title = "Chat";
	}



	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
