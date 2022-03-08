import { BaseApi } from "./baseApi";
import { HTTPTransport } from "../../utils";
import { ChatCreateFormType } from "./http.types";

const chatApiInstance = new HTTPTransport({ endPoint: "/chats" });

export class ChatApi extends BaseApi {
	create(formData: ChatCreateFormType) {
		return chatApiInstance.post("", {
			data: JSON.stringify(formData),
		});
	}

	getChatList() {
		return chatApiInstance.get("");
	}

	request() {
		return chatApiInstance.get("/full");
	}

	getChatToken(chatId: number) {
		return chatApiInstance.post(`/token/${chatId}`);
	}

	addUser(chatId: number, userId: number) {
		return chatApiInstance.put("/users", {
			headers: {
				"content-type": "application/json",
			},
			data: JSON.stringify({
				users: [userId],
				chatId,
			}),
		});
	}
	removeUser(chatId: number, userId: number) {
		return chatApiInstance.delete("/users", {
			headers: {
				"content-type": "application/json",
			},
			data: JSON.stringify({
				users: [userId],
				chatId,
			}),
		});
	}
}
