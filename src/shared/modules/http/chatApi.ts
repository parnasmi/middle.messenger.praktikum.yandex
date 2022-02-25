import { BaseApi } from "./baseApi";
import { HTTPTransport } from "../../utils";
import { ChatCreateFormType } from "./http.types";

const chatApiInstance = new HTTPTransport({ endPoint: "/chats" });

export class ChatApi extends BaseApi {
	create(formData: ChatCreateFormType) {
		return chatApiInstance.post("", {
			data: JSON.stringify(formData),
			headers: {
				"content-type": "application/json",
			},
		});
	}

	getChatList() {
		return chatApiInstance.get("");
	}

	request() {
		return chatApiInstance.get("/full");
	}

	getChatToken(chatId: number) {
		return chatApiInstance.post(`/token/${chatId}`, {
			headers: { "content-type": "application/json" },
		});
	}
}
