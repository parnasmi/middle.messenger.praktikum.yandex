import { IFormCallback } from "../types";
import { XHRHTTPRequestResultType } from "../../utils/HTTPTransport/types";
import { ChatApi } from "../http";
import { ChatCreateFormType } from "../http/http.types";
import store from '../../store';
const chatApi = new ChatApi();

export class ChatController {
	public async createChat(createData: ChatCreateFormType, cb?: IFormCallback) {
		try {
			const response = await chatApi.create(createData);
			cb?.success!(response.json());
			const chatlist = await chatApi.getChatList();
			store.set('chats', chatlist.json());
		} catch (e: unknown) {
			cb?.error!((e as XHRHTTPRequestResultType).json());
		}
	}

	public async getChatList(cb?:IFormCallback) {
		try {
			const response = await chatApi.getChatList();
			cb?.success!(response.json());
			store.set('chats', response.json());
		} catch (e: unknown) {
			cb?.error!((e as XHRHTTPRequestResultType).json());
		}
	}
}
