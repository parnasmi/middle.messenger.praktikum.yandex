import {Indexed, StoreEvents} from './store.types'
import {EventBus, set} from "../utils";
class Store extends EventBus{
  private state:Indexed = {}

  public getState() {
    return this.state
  }

  public set(path:string, value: unknown) {
    set(this.state, path, value)

    this.emit(StoreEvents.Updated)
  }
}

export default new Store();
