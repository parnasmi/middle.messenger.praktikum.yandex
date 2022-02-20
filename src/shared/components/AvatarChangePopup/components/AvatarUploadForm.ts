import { Block } from "../../../utils";
import tmpl from "./avatarUploadForm.tmpl.hbs";
import { Button } from "../../Button";
import {AvatarUploadFormType, FileInputType} from "./avatarUploadForm.types";

class FileInput extends Block {
	constructor(props:FileInputType ) {
		super("input", {
			...props,
			attributes: {
				id: "avatar",
				type: "file",
				name: "avatar",
				accept: "image/*",
				class: "visually-hidden",
			},
		});
	}
}



export class AvatarUploadForm extends Block {
	constructor({ inputEvents,...restProps }: AvatarUploadFormType) {
		const input = new FileInput({events: inputEvents})
		const button = new Button({
			title: "Поменять",
			events: {
				click: () => console.log("change avatar"),
			},
			attributes: {
				class: "full-w mb-10",
				type: "submit",
			},
		});
		super("form", {
			...restProps,
			attributes: {
				enctype: "multipart/form-data",
				id: "avatarUploader",
			},
			button,
			input,
			selectedClass: "",
			filename: null,
		});
	}

	protected render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
