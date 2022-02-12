import "../../scss/styles.scss";
import "../../scss/pages/profile.scss";
import { Block } from "../../shared/utils";
import tmpl from "./profile.tmpl.hbs";
import { ProfileDataItem, ProfileNav } from "../../shared/components";
import { ProfileAvatar } from "../../shared/components";
import { ProfileDataItemTypes } from "../../shared/components/ProfileDataItem/ProfileDataItem.types";
import { dataItemJson } from "./dataItemJson";

export class Profile extends Block<{}> {
	constructor() {
		document.title = "Profile";
		const profileNav = new ProfileNav();
		const profileAvatar = new ProfileAvatar({});
		super("main", {
			attributes: {
				class: "flex full-h-w profile",
			},
			children: {
				profileNav,
				profileAvatar,
			},
		});

		this._generateDataItems(dataItemJson);
	}

	private _generateDataItems(dataItems: ProfileDataItemTypes[]) {
		this.children.dataItemsList = dataItems.map((dataItem) => {
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
