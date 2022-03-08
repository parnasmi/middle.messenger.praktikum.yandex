import { Block } from "../../../shared/utils";
import tmpl from "./skeletonProfile.tmpl.hbs";
export class SkeletonProfile extends Block {
	constructor() {
		super("div", {
			attributes: {
				class: "skeleton-profile",
			},
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
