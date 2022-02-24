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
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event:PopStateEvent) => {
      // this._onRoute(event.currentTarget.location.pathname);
      this._onRoute(document.location.pathname);
      console.log('event popstate', event)
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname:string) {
    const route = this.getRoute(pathname);
    // const areRoutesNotEqual = this._currentRoute !== route;
    if (!route) {
      this.go('/not-found')
      return;
    }

    // if (this._currentRoute && areRoutesNotEqual) {
    //   this._currentRoute.leave();
    // }

    this._currentRoute = route;
    // route.render(route, pathname);
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
