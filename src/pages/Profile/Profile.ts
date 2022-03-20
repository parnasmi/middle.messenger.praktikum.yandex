import "../../scss/styles.scss";
import "../../scss/pages/profile.scss";
import tmpl from "./profile.tmpl.hbs";
import {
	AvatarChangePopup,
	ProfileDataItem,
	ProfileNav,
	ProfileAvatar,
	Popup,
	Element,
} from "../../shared/components";
import { ProfileDataItemTypes } from "../../shared/components/ProfileDataItem/ProfileDataItem.types";
import { dataItemJson } from "./dataItemJson";
// import {connect} from "../../shared/store";
import { SkeletonProfile } from "./components";
// import store, { StoreEvents } from "../../shared/store";
import { ProfileController } from "../../shared/modules/profile";
import { OverlayPopup } from "../../shared/components/OverlayPopup";
// import { TUser } from "../../shared/modules/types";
import { RESOURCE_URL } from "../../../config";
import { Router } from "../../shared/utils";
import { AuthController } from "../../shared/modules/auth";
import { initializePublicRoutes } from "../../index";

const profileController = new ProfileController();
const authController = new AuthController();
const router = new Router("#root");
export class Profile extends Popup {
	constructor() {
		document.title = "Profile";
		const profileNav = new ProfileNav();
		const profileAvatar = new ProfileAvatar({ avatarUrl: null });
		const skeleton = new SkeletonProfile();
		const overlayPopup = new OverlayPopup();
		const avatarChangePopup = new AvatarChangePopup();
		const editLink = new Element({
			tagName: "a",
			text: "Изменить данные",
			attributes: { class: "profile-info__action", href: "#" },
			events: {
				click: (e: Event) => {
					e.preventDefault();
					router.go("/settings-update");
				},
			},
		});
		const passwordChangeLink = new Element({
			tagName: "a",
			text: "Изменить пароль",
			attributes: { class: "profile-info__action", href: "#" },
			events: {
				click: (e: Event) => {
					e.preventDefault();
					router.go("/password-change");
				},
			},
		});
		const logoutLink = new Element({
			tagName: "a",
			text: "Выйти",
			attributes: { class: "error profile__logout", href: "#" },
			events: {
				click: async (e: Event) => {
					e.preventDefault();
					await authController.logout({
						success: () => {
							setTimeout(() => {
								initializePublicRoutes();
								router.go("/sign-in");
							}, 100);
						},
					});
				},
			},
		});
		super("main", {
			attributes: {
				class: "flex full-h-w profile",
			},
			children: {
				profileNav,
				profileAvatar,
				overlayPopup,
				avatarChangePopup,
				passwordChangeLink,
				editLink,
				logoutLink,
			},
			isFetched: false,
			skeleton,
			firstName: null,
		});

		// store.on(StoreEvents.Updated, () => {
		// 	// вызываем обновление компонента, передав данные из хранилища
		// 	this.setProps(store.getState().user);

		this.children.dataItemsList = this._generateDataItems(dataItemJson);
		profileController.getProfile({
			success: (data: any) => {
				try {
					const profileData = dataItemJson.reduce((acc, curr) => {
						return [...acc, { ...curr, valueComponent: data[curr.field] }];
					}, [] as ProfileDataItemTypes[]);

					const items = this._generateDataItems(profileData);
					this.setProps({
						children: {
							dataItemsList: items,
							profileNav,
							profileAvatar,
							overlayPopup,
							avatarChangePopup,
							editLink,
							passwordChangeLink,
							logoutLink,
						},
						isFetched: true,
						firstName: data.first_name,
					});
					profileAvatar.setProps({ avatarUrl: `${RESOURCE_URL}${data.avatar}` });
				} catch (e) {
					console.log("error occured while set props", e);
				}
			},
		});
	}

	private _generateDataItems(dataItems: ProfileDataItemTypes[]) {
		return dataItems.map((dataItem) => {
			return new ProfileDataItem({
				label: dataItem.label,
				valueComponent: dataItem.valueComponent,
			});
		});
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
