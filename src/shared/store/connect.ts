import {Block} from "../utils";
import {Indexed, StoreEvents} from "./store.types";
import store from "./Store";

export function connect(Component: typeof Block, mapStateToProps: (state: Indexed) => Indexed) {
  // используем class expression
  return class extends Component {
    constructor(props:any) {
      super({...props, ...mapStateToProps(store.getState())});

      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // вызываем обновление компонента, передав данные из хранилища
        this.setProps({...mapStateToProps(store.getState())});
      });
    }
  }
}
