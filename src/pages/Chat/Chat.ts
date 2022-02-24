import { Block } from "../../shared/utils";
import tmpl from "./chat.tmpl.hbs";
import { base } from "../../shared/views/layouts";

const layouts = require("handlebars-layouts");
import "../../scss/styles.scss";
import "../../scss/pages/chat/index.scss";
import { ChatContent, ChatSidebar,ChatPending } from "./components";
import {OverlayPopup} from "../../shared/components/OverlayPopup";
import handlebars from "handlebars/dist/handlebars.runtime";
import store, {connect} from '../../shared/store';

const searchIcon = new URL("../../assets/img/icon-search.svg", import.meta.url);
// Register helpers
handlebars.registerHelper(layouts(handlebars));
// Register partials
handlebars.registerPartial("layout", base);

class Chat extends Block {
	constructor() {
		const chatSidebar = new ChatSidebar();
		const chatContent = new ChatContent();
		const chatPending = new ChatPending();
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
				chatPending,
			},
		});
		document.title = "Chat";

		window.addEventListener("hashchange", () => {
			const chatId = window.location.hash.slice(1);
			store.set("selectedChatId", chatId);
			console.log("hashChange", chatId);
		});
	}

	componentDidUpdate(oldProps: any, newProps: any): boolean {
		console.log('newProps Chat', newProps)
		return true
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}

export default connect(Chat, (state) => ({selectedChatId: state?.selectedChatId}))
