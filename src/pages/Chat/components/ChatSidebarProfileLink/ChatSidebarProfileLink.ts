import {Block} from "../../../../shared/utils";
import {IProfileLink} from "./profileLink.types";
import tmpl from './chatSidebarProfileLink.hbs';
export class ChatSidebarProfileLink extends Block {
	constructor(props: IProfileLink) {
		super("a", {
			...props,
      attributes: {
        ...props.attributes,
        class: 'chat__profile-link flex items-center',
				href: '#'
      }
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
