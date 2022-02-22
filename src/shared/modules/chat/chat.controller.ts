import { IFormCallback } from "../types";
import { XHRHTTPRequestResultType } from "../../utils/HTTPTransport/types";
import { ChatApi } from "../http";
import { ChatCreateFormType } from "../http/http.types";

const chatApi = new ChatApi();

export class ChatController {
	public async createChat(createData: ChatCreateFormType, cb?: IFormCallback) {
		try {
			const chatData = await chatApi.create(createData);
			cb?.success!(chatData);
		} catch (e: unknown) {
			cb?.error!((e as XHRHTTPRequestResultType).json());
		}
	}
}
