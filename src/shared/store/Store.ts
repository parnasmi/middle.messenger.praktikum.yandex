import { Indexed, StoreEvents } from "./store.types";
import { EventBus, set } from "../utils";
class Store extends EventBus {
	private state: Indexed = {
		messages: []
	};

	public getState() {
		return this.state;
	}

	public initialSet(path: string, value: unknown) {
		set(this.state, path, value);
	}

	public set(path: string, value: unknown) {
		set(this.state, path, value);
		try {
			this.emit(StoreEvents.Updated);
		} catch (e) {
			console.error('no such event', e)
		}
	}
}

export default new Store();
