import "../../scss/styles.scss";
import "../../scss/pages/profile.scss";
import { Block } from "../../shared/utils";
import tmpl from "./profile.tmpl.hbs";
import { ProfileDataItem, ProfileNav } from "../../shared/components";
import { ProfileAvatar } from "../../shared/components";
import { ProfileDataItemTypes } from "../../shared/components/ProfileDataItem/ProfileDataItem.types";
import { dataItemJson } from "./dataItemJson";
// import {connect} from "../../shared/store";
import { SkeletonProfile } from "./components";
// import store, { StoreEvents } from "../../shared/store";
import { ProfileController } from "../../shared/modules/profile";
// import { TUser } from "../../shared/modules/types";

const profileController = new ProfileController();

export class Profile extends Block<{}> {
	constructor() {
		document.title = "Profile";
		const profileNav = new ProfileNav();
		const profileAvatar = new ProfileAvatar({});
		const skeleton = new SkeletonProfile();
		super("main", {
			attributes: {
				class: "flex full-h-w profile",
			},
			children: {
				profileNav,
				profileAvatar,
			},
			isFetched: false,
			skeleton,
		});

		// store.on(StoreEvents.Updated, () => {
		// 	// вызываем обновление компонента, передав данные из хранилища
		// 	this.setProps(store.getState().user);

		this.children.profileItemsList = this._generateDataItems(dataItemJson);
		profileController.getProfile({
			success: (data: any) => {
				try {
					const profileData = dataItemJson.reduce((acc, curr) => {
						return [...acc, { ...curr, valueComponent: data[curr.field] }];
					}, [] as ProfileDataItemTypes[]);

					const profileItemsList = this._generateDataItems(profileData);
					this.setProps({
						children: {
							profileItemsList,
							profileNav,
							profileAvatar,
						},
						isFetched: true,
					});
				} catch (e) {
					console.log('error occured while set props', e)
				}

			},
		});
	}

	private _generateDataItems(dataItems: ProfileDataItemTypes[]) {
		console.log('dataItems',dataItems)
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
