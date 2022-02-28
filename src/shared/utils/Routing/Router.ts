import { Route } from "./Route";
import { Block } from "../Block";

export class Router {
	private history: History;
	private routes: Route[];
	private readonly _rootQuery: string;
	private _currentRoute: Route | null;
	static __instance: Router;

	constructor(rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;

		Router.__instance = this;
	}

	public use(pathname: string, block: typeof Block) {
		const route = new Route(pathname, block, { rootQuery: this._rootQuery });
		this.routes.push(route);
		return this;
	}

	public start() {
		window.onpopstate = () => {
			this._onRoute(window.location.pathname);
		};
		this._onRoute(window.location.pathname);
	}

	public go(pathname: string) {
		this.history.pushState({}, "", pathname);
		this._onRoute(pathname);
	}

	public back() {
		this.history.back();
	}

	public forward() {
		this.history.forward();
	}

	private _onRoute(pathname: string) {
		const route = this.getRoute(pathname);
		if (!route) {
			this.go("/not-found");
			return;
		}
		if (this._currentRoute) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render();
	}

	private getRoute(pathname: string) {
		return this.routes.find((route) => route.match(pathname));
	}
}
