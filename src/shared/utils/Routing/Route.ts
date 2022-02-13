import { isEqual } from '../utilityFns/';
import { render } from '../render';
import {Block} from "../Block";
import {RouteProps} from "./routing.types";

export class Route {
  private _block:Block | null;
  private _pathname: string = '';
  private _blockClass: new () => Block;//TODO: check field
  private _props: RouteProps;

  constructor(pathname:string, view:new () => Block, props:RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname:string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname:string) {
    return isEqual(pathname, this._pathname);
  }

  private mountInDom() {
    if(this._block && this._props) {
      render(this._props.rootQuery, this._block);
    }
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      this.mountInDom();
      return;
    }
    // this._block.show();
    this.mountInDom();

  }
}
