import { nanoid } from "nanoid";
import { Meta, Events } from "./types";
import { EventBus } from "../Eventbus";

// Ревьюверу - никак не смог заставить работать через generic. Во вложенных компонентах не удалось типизировать
export class Block<P = any> {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
	} as const;

	public id = nanoid(6);
	private _meta: Meta;
	private _element: HTMLElement | null = null;
	protected readonly props: P;
	public eventBus: () => EventBus<Events>;
	// public children: Record<string, Block> = {};
	public children: { [key: string]: Block | Block[] } = {};

	public constructor(tagName: string, propsAndChildren?: P) {
		const eventBus = new EventBus<Events>();
		const { children, props } = this._getChildren(propsAndChildren);
		this._meta = {
			tagName,
			props,
		};

		this.props = this._makePropsProxy(props || ({} as P));
		this.children = { ...(propsAndChildren as any).children, ...children };
		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT, this.props);
	}

	private _registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_getChildren(propsAndChildren: any) {
		const children: Record<string, Block> | Record<string, Block[]> = {};
		const props: any = {};

		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key as string] = value;
			}
		});

		return { children, props };
	}

	// eslint-disable-next-line no-unused-vars
	compile(tmpl: (ctx: any) => string, props: any) {
		const propsAndStubs = { ...props };

		Object.entries(this.children).forEach(([key, child]) => {
			if (Array.isArray(child)) {
				propsAndStubs[key] = [];
				child.forEach((childItem) => {
					propsAndStubs[key].push(`<div data-id="${childItem.id}"></div>`);
				});
			} else {
				propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
			}
		});

		const fragment = document.createElement("template");
		fragment.innerHTML = tmpl(propsAndStubs);

		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach((childItem) => {
					const stub = fragment.content.querySelector(`[data-id="${childItem.id}"]`);
					if (!stub) return;
					stub.replaceWith(childItem.getContent());
				});
			} else {
				const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
				if (!stub) return;
				stub.replaceWith(child.getContent());
			}
		});
		return fragment.content;
	}

	private _componentDidMount(props: P) {

		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach((childElement) => childElement.dispatchComponentDidMount());
			} else {
				child.dispatchComponentDidMount();
			}
		});

		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		setTimeout(() => {
			this.componentDidMount(props);
		},300)
	}

	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps: P, newProps: P) {
		const response = this.componentDidUpdate(oldProps, newProps);

		if (!response) return;

		if (newProps && "children" in newProps) {
			this.children = (newProps as any).children;
		}

		this._render();
	}

	// eslint-disable-next-line no-unused-vars
	public componentDidUpdate(oldProps: P, newProps: P) {
		return true;
	}

	get element() {
		return this._element!;
	}

	private _render() {
		const documentFragment = this.render();

		this._removeEvents();
		this._element!.innerHTML = "";
		this._element!.appendChild(documentFragment);
		this._updateAttributes();
		this._addEvents();
	}

	protected render(): DocumentFragment {
		return new DocumentFragment();
	}

	private _addEvents() {
		const events: Record<string, () => void> = (this.props as any).events;

		if (!events) return;

		Object.entries(events).forEach(([event, listener]) => {
			this._element?.addEventListener(event, listener);
		});
	}

	private _updateAttributes() {
		const attributes: Record<string, string> = (this.props as any).attributes;

		if (!attributes) {
			return;
		}

		Object.entries(attributes).forEach(([name, value]) => {
			this._element!.setAttribute(name, value);
		});
	}

	public getContent(): HTMLElement {
		return this.element!;
	}

	private _removeEvents() {
		const events: Record<string, () => void> = (this.props as any).events;

		if (!events || !this._element) {
			//???
			return;
		}

		Object.entries(events).forEach(([event, listener]) => {
			this._element?.removeEventListener(event, listener);
		});
	}

	// eslint-disable-next-line no-unused-vars
	public componentDidMount(props: P) {}

	public init() {
		this._createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_CDM, this.props);
	}

	private _createResources() {
		const { tagName } = this._meta;

		this._element = this._createDocumentElement(tagName);
	}

	private _createDocumentElement(tagName: string) {
		return document.createElement(tagName);
	}

	private _makePropsProxy(props: P) {
		const self = this;

		return new Proxy(props as unknown as object, {
			get(target: Record<string, unknown>, prop: string) {
				const value = target[prop];
				return typeof value === "function" ? value.bind(target) : value;
			},
			set(target: Record<string, unknown>, prop: string, value: unknown) {
				target[prop] = value;
				self
					.eventBus()
					.emit(Block.EVENTS.FLOW_CDU, { ...target }, self._meta.props);
				return true;
			},
			deleteProperty() {
				throw new Error("Not allowed");
			},
		}) as unknown as P;
	}

	public setProps = (nextProps: P) => {
		if (!nextProps) return;

		Object.assign(this.props, nextProps);
	};

	public show() {
		this.getContent().style.display = "block";
	}

	public hide() {
		this.getContent().style.display = "none";
	}
}
