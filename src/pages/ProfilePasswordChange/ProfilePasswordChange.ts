import '../../scss/styles.scss'
import '../../scss/pages/profile.scss'
import {Block} from "../../shared/utils";
import tmpl from './profilePassowordChange.tmpl.hbs'
import {ProfileNav,ProfileAvatar} from "../../shared/components";
import {PasswordChangeForm} from "./components";

export class ProfilePasswordChange extends Block {
	constructor() {
		document.title = 'Profile';
		const profileNav = new ProfileNav()
		const profileAvatar = new ProfileAvatar({attributes: {class: 'profile__avatar_edit'}})
    const editForm = new PasswordChangeForm({})
		super('main', {
			attributes: {
				class: 'flex full-h-w profile'
			},
			children: {
				profileNav,
				profileAvatar,
				editForm
			}
		});

		// this._generateFormAfterDidMount(dataItemJson)
	}

	//TODO: _generateFormAfterDidMount

	render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
