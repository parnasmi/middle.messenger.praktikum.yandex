import '../../scss/styles.scss'
import '../../scss/pages/profile.scss'
import {Block} from "../../shared/utils";
import tmpl from './profileEdit.tmpl.hbs'
import {Button, ProfileDataItem, ProfileNav, TextInput} from "../../shared/components";
import {ProfileAvatar} from "../../shared/components/ProfileAvatar";
import {ProfileDataItemTypes} from "../../shared/components/ProfileDataItem/ProfileDataItem.types";

const dataItemJson = [
	{
	label: 'Почта',
	valueComponent: 'pochta@yandex.ru'
	},
	{
		label: 'Логин',
		valueComponent: 'ivanivanov'
	},
	{
		label: 'Имя',
		valueComponent: 'Иван'
	},
	{
		label: 'Фамилия',
		valueComponent: 'Иванов'
	},
	{
		label: 'Имя в чате',
		valueComponent: 'Иван'
	},
	{
		label: 'Телефон',
		valueComponent: '+7 (909) 967 30 30'
	}
]

export class ProfileEdit extends Block {
	constructor() {
		document.body.className = 'h-screen profile w-screen';
		document.title = 'Profile';
		const profileNav = new ProfileNav()
		const profileAvatar = new ProfileAvatar()
		const saveButton = new Button({
			title: 'Сохранить',
			attributes: { class: "full-w", type: "submit" },
			events: {
				click: () => console.log('data saved')
			}
		});
		super('main', {
			attributes: {
				class: 'flex full-h-w profile'
			},
			children: {
				profileNav,
				profileAvatar,
				saveButton
			}
		});

		this._generateDataItems(dataItemJson)
	}

	private _generateDataItems(dataItems:ProfileDataItemTypes[]) {

		this.children.dataItemsList = dataItems.map((dataItem) => {
			const textInput = new TextInput({
				attributes: {
					class: "profile-info__input border-none text-right",
					name: 'fieldName',
					value: typeof dataItem.valueComponent === "string" ? dataItem.valueComponent : ''
				},
				hasDefaultClass: false
			})
			return new ProfileDataItem({label: dataItem.label, valueComponent:textInput})
		})
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props)
	}
}
