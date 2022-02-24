import { Block } from "../../../../shared/utils";
import { ChatItemType } from "./chatItemTypes.types";
import tmpl from "./chatItem.tmpl.hbs";
export class ChatItem extends Block {
	constructor(props: ChatItemType) {
		super("li", {
			attributes: {
				class: "chat__list-item",
			},
			...props,
			events: {
				click: () => {
					console.log(props.id);
					// const urlParams = new URLSearchParams(window.location.search);
					// urlParams.set('chatId', props.id);
					// console.log('urlParams', urlParams)
					// window.location.search = urlParams as unknown as string;

					const chatId = props.id;
					// function setQueryStringParameter(name:string, value:string, append=false) {
					// 	const url = new URL(window.document.URL);
					// 	if (append) url.searchParams.append(name, value);
					// 	else url.searchParams.set(name, value);
					// 	window.history.replaceState(null, "", url.toString());
					// }

					// setQueryStringParameter('chatId', chatId.toString())
				},
			},
		});
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
