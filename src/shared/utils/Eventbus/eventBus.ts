import { Listener } from "./types";

// eslint-disable-next-line no-unused-vars
export class EventBus<
	E extends string = string,
	M extends { [K in E]: unknown[] } = Record<E, any[]>,
> {
	// eslint-disable-next-line no-unused-vars
	private events: { [key in E]?: Listener<M[E]>[] } = {};
	on(event: E, callback: Listener<M[E]>): void {
		if (!this.events[event]) this.events[event] = [];
		this.events[event]?.push(callback);
	}

	off(event: E, callback: Listener<M[E]>) {
		if (!this.events[event]) {
			throw new Error(`no such event: ${event}`);
		}
		this.events[event] = this.events[event]?.filter(
			(listener) => listener !== callback,
		);
	}

	emit(event: E, ...args: M[E]) {
		if (!this.events[event]) {
			throw new Error(`no such event: ${event}`);
		}
		this.events[event]?.forEach((listener) => {
			listener(...args);
		});
	}
}
