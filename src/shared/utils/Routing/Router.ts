import {Route} from './Route';
import {Block} from "../Block";
export class Router {
  private history: History;
  private routes:Route[];
  private readonly _rootQuery: string;
  private _currentRoute:Route | null;
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

  use(pathname:string, block:new () => Block) {
    console.log('initiate routes', pathname)
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((event:PopStateEvent) => {
      this._onRoute(document.location.pathname);
      // @ts-ignore
      // const pathname = event.currentTarget.location.pathname;
      // console.log('pathname onpopstate',pathname)
      // this._onRoute(pathname);

    }).bind(this);
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname:string) {
    const route = this.getRoute(pathname);
    if (!route) {
      this.go('/not-found')
      // this.go(onLoadPathname)
      return;
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname:string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname:string) {
    return this.routes.find(route => route.match(pathname));
  }
}
