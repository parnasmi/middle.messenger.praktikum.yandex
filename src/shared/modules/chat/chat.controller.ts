import { IFormCallback } from "../types";
import { XHRHTTPRequestResultType } from "../../utils/HTTPTransport/types";
import { ChatApi } from "../http";
import { ChatCreateFormType } from "../http/http.types";
import store from '../../store';
import {websocket} from "../../utils";
import {InitWsParams} from "./chat.types";
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
			this.initWebsocket({userId, chatId, token})
		} catch (e) {
			console.error('token getting error', (e as XHRHTTPRequestResultType).json())
		}
	}
	
	public async addUser(chatId:number, userId:number, cb:IFormCallback) {
		try {
			await chatApi.addUser(chatId, userId);
			cb.success!({})
		} catch (e) {
			cb.error!({reason: "Error occured while adding user. Try again"})
		}
	}

	public async removeUser(chatId:number, userId:number, cb:IFormCallback) {
		try {
			await chatApi.removeUser(chatId, userId);
			cb.success!({})
		} catch (e) {
			cb.error!({reason: "Error occured while removing user. Try again"})
		}
	}

	private initWebsocket({userId, chatId, token}:InitWsParams) {
		websocket.init(`${userId}/${chatId}/${token}`);
		websocket.onOpen(() => {
			console.log('socket is open')

			setInterval(() => {
				websocket.sendMessage({type: 'ping'})
			}, 30000)

			websocket.sendMessage({
				type: 'ping',
			});
			websocket.sendMessage({
				type: 'get old',
				content: '0'
			});
		})
		websocket.onClose((event) => {
			if (event.wasClean) {
				console.log('Соединение закрыто чисто');
			} else {
				console.log('Обрыв соединения');
			}
			console.log(`Код: ${event.code} | Причина: ${event.reason}`);
		})
		websocket.onMessage((event) => {
			const data = JSON.parse(event.data);
			const storeMessages = store.getState().messages;

			if(data.type === 'message') {
				//save to store
				store.set('messages', [...storeMessages, data])
			}

			if(Array.isArray(data)) {
				store.set('messages', [...data.reverse(),...storeMessages])
			}
			console.log("message data", { data, messages: storeMessages });
		})
	}
}
