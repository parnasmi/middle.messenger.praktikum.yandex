import { CHATWEBSOCKET_URL } from "../../../../config";

// eslint-disable-next-line no-unused-vars
export type WebsocketHandlerType = (e: MessageEvent) => void;
// eslint-disable-next-line no-unused-vars
export type WebsocketCloseHandlerType = (e: CloseEvent) => void;

export class websocket {
	private static ws: WebSocket;

	static init(endPoint: string) {
		this.ws = new WebSocket(`${CHATWEBSOCKET_URL}/${endPoint}`);
	}

	static onMessage(handler: WebsocketHandlerType) {
		this.ws.addEventListener("message", handler);
	}

	static offMessage(handler: WebsocketHandlerType) {
		this.ws.removeEventListener("message", handler);
	}

	static isOpen() {
		// return this.ws?.readyState === this.ws?.OPEN;
		return this.ws?.readyState;
	}

	static sendMessage(message: Record<string, string>) {
		this.ws.send(JSON.stringify(message));
	}

	static onOpen(handler:() => void) {
		this.ws.addEventListener('open', handler);
	}
	static onClose(handler:WebsocketCloseHandlerType) {
		this.ws.addEventListener('close', handler);
	}

	static closeSocket() {
		if(this.ws) {
			this.ws.close();
			console.log("------ Websocket closed ------ ");
		}
	}
}
