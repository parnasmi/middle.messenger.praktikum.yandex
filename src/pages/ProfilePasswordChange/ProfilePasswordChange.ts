import "../../scss/styles.scss";
import "../../scss/pages/profile.scss";
import { Block } from "../../shared/utils";
import tmpl from "./profilePassowordChange.tmpl.hbs";
import { ProfileNav, ProfileAvatar } from "../../shared/components";
import { PasswordChangeForm } from "./components";
import store from '../../shared/store';
import {RESOURCE_URL} from "../../../config";
export class ProfilePasswordChange extends Block {
	constructor() {
		document.title = "Profile";
		const profileNav = new ProfileNav();
		const profileAvatar = new ProfileAvatar({
			attributes: { class: "profile__avatar_edit" },
			avatarUrl: null,
		});
		const editForm = new PasswordChangeForm({});
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
		(this.children.profileAvatar as Block).setProps({avatarUrl: `${RESOURCE_URL}${user.avatar}`,})
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
