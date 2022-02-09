import '../../scss/styles.scss'
import '../../scss/pages/profile.scss'
import {Block} from "../../shared/utils";
import tmpl from './profileEdit.tmpl.hbs'
import {ProfileNav,ProfileAvatar} from "../../shared/components";
import {EditForm} from "./components";


const userProfileData:Record<string, string> = {
	email: 'pochta@yandex.ru',
	login: 'ivanivanov',
	first_name: 'Ivan',
	second_name: 'Ivanov',
	phone: '+79099673030',
	chat_name: 'Ivanchik',
}

export class ProfileEdit extends Block {
	constructor() {
		document.title = 'Profile';
		const profileNav = new ProfileNav()
		const profileAvatar = new ProfileAvatar({})
    const editForm = new EditForm({userProfileData})
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
