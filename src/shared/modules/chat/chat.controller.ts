import { IFormCallback } from "../types";
import { XHRHTTPRequestResultType } from "../../utils/HTTPTransport/types";
import { ChatApi } from "../http";
import { ChatCreateFormType } from "../http/http.types";
import store from '../../store';
import {websocket} from "../../utils";
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

	public async getChatToken(chatId:number) {
		try {
			const response = await chatApi.getChatToken(chatId);
			const { token } = response.json();
			const { id: userId } = store.getState().user;
			websocket.init(`${userId}/${chatId}/${token}`);
			websocket.onOpen(() => {
				console.log('socket is open')

				websocket.sendMessage({
					content: 'Моё первое сообщение миру!',
					type: 'message',
				});
			})
			websocket.onClose((event:CloseEvent) => {
				if (event.wasClean) {
					console.log('Соединение закрыто чисто');
				} else {
					console.log('Обрыв соединения');
				}
				console.log(`Код: ${event.code} | Причина: ${event.reason}`);
			})
			websocket.onMessage((event) => {
				const data = JSON.parse(event.data);
					console.log('message data',data)
			})
			console.log('chat token', token);
		} catch (e) {
			console.error('token getting error', (e as XHRHTTPRequestResultType).json())
		}
	}
}
