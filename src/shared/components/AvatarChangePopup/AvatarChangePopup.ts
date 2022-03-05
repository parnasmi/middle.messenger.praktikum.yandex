import { Block } from "../../utils";
import tmpl from "./avatarChangePopup.tmpl.hbs";
import { ProfileController } from "../../modules/profile";
import { AvatarUploadForm } from "./components";

const profileController = new ProfileController();

export class AvatarChangePopup extends Block {
	fileInput: HTMLInputElement;
	private file: File;

	constructor() {
		const form = new AvatarUploadForm({
			inputEvents: {
				change: (e: Event) => {
					//@ts-ignore
					const file = e.target.files[0];
					this.file = file;
					form.setProps({
						filename: file.name,
						selectedClass: "popup__action-text_selected",
					});
					this.setProps({
						filename: file.name,
						attributes: { class: "popup avatar-popup active" },
					});
				},
			},
			events: {
				submit: async (e: Event) => {
					e.preventDefault();
					const form: FormData = new FormData();
					form.append("avatar", this.file);
					await profileController.uploadAvatar(form, {
						success: () => {
							this.setProps({
								selectedClass: "popup__action-text_selected",
								attributes: { class: "popup avatar-popup active" },
								fileHasbeenUploaded: true,
							});
						},
						error: (error) => {
							this.setProps({
								selectedClass: "popup__action-text_selected",
								attributes: { class: "popup avatar-popup active" },
								errorText: (error as any).reason,
								filename: null,
							});
						},
					});
				},
			},
		});
		super("div", {
			attributes: {
				class: "popup avatar-popup",
			},
			errorText: "Нужно выбрать файл",
			fileHasbeenUploaded: false,
			form,
		});
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
