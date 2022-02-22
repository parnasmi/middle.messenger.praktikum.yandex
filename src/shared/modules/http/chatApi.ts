import { BaseApi } from "./baseApi";
import { HTTPTransport } from "../../utils";
import { ChatCreateFormType } from "./http.types";

const chatApiInstance = new HTTPTransport({ endPoint: "/chats" });

export class ChatApi extends BaseApi {
	create(formData: ChatCreateFormType) {
		return chatApiInstance.post("", {
			data: JSON.stringify(formData),
			headers: {
				"content-type": "application/json"
			},
		});
	}

	request() {
		return chatApiInstance.get("/full");
	}
}
