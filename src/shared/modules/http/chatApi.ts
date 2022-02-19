import {BaseApi} from './baseApi'
import {HTTPTransport} from "../../utils";

const chatApiInstance = new HTTPTransport({endPoint: '/chat'});

export class ChatApi extends BaseApi {
	create() {
		return chatApiInstance.post("/", { data: { title: "someTitle" } });
	}
	request() {
		return chatApiInstance.get('/full');
	}
}
