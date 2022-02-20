import "../../scss/styles.scss";
import "../../scss/pages/profile.scss";
import tmpl from "./profile.tmpl.hbs";
import {
	AvatarChangePopup,
	ProfileDataItem,
	ProfileNav,
	ProfileAvatar, Popup,
} from "../../shared/components";
import { ProfileDataItemTypes } from "../../shared/components/ProfileDataItem/ProfileDataItem.types";
import { dataItemJson } from "./dataItemJson";
// import {connect} from "../../shared/store";
import { SkeletonProfile } from "./components";
// import store, { StoreEvents } from "../../shared/store";
import { ProfileController } from "../../shared/modules/profile";
import { OverlayPopup } from "../../shared/components/OverlayPopup";
// import { TUser } from "../../shared/modules/types";

const profileController = new ProfileController();

export class Profile extends Popup {

	constructor() {
		document.title = "Profile";
		const profileNav = new ProfileNav();
		const profileAvatar = new ProfileAvatar({ avatarUrl: null });
		const skeleton = new SkeletonProfile();
		const overlayPopup = new OverlayPopup();
		const avatarChangePopup = new AvatarChangePopup();
		super("main", {
			attributes: {
				class: "flex full-h-w profile",
			},
			children: {
				profileNav,
				profileAvatar,
				overlayPopup,
				avatarChangePopup,
			},
			isFetched: false,
			skeleton,
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
						},
						isFetched: true,
					});
					// profileAvatar.setProps({avatarUrl: null})
				} catch (e) {
					console.log("error occured while set props", e);
				}
			},
		});
		// console.log("props profile", this.props);
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
