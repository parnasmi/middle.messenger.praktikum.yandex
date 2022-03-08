import "../../scss/styles.scss";
import "../../scss/pages/profile.scss";
import { Block } from "../../shared/utils";
import tmpl from "./profileEdit.tmpl.hbs";
import { ProfileNav, ProfileAvatar } from "../../shared/components";
import { EditForm } from "./components";
import store from "../../shared/store";
import { RESOURCE_URL } from "../../../config";

const userProfileData: Record<string, string> = {
	email: "pochta@yandex.ru",
	login: "ivanivanov",
	first_name: "Ivan",
	second_name: "Ivanov",
	phone: "+79099673030",
	chat_name: "Ivanchik",
};

export class ProfileEdit extends Block {
	constructor() {
		document.title = "Profile Update";
		const profileNav = new ProfileNav();
		const profileAvatar = new ProfileAvatar({ avatarUrl: null });
		const editForm = new EditForm({ userProfileData });
		super("main", {
			attributes: {
				class: "flex full-h-w profile",
			},
			children: {
				profileNav,
				profileAvatar,
				editForm,
			},
		});
	}

	componentDidMount() {
		const user = store.getState().user;
		(this.children.editForm as Block).setProps({ userProfileData: user });
		(this.children.profileAvatar as Block).setProps({
			avatarUrl: `${RESOURCE_URL}${user.avatar}`,
		});
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
