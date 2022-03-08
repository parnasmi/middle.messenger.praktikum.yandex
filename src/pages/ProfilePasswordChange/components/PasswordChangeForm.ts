import tmpl from "./passwordChangeForm.tmpl.hbs";
import { Button, EditInputField, Form } from "../../../shared/components";
import { Block } from "../../../shared/utils";
import { userProfileFormFields } from "./userProfileFormFields";
import { ProfileController } from "../../../shared/modules/profile";
import { PasswordChangeFormType } from "./PasswordChangeForm.types";

const profileController = new ProfileController();

export class PasswordChangeForm extends Form<PasswordChangeFormType> {
	constructor(props: any) {
		super(props);
		this._generateInputs(userProfileFormFields);
	}

	_onSend() {
		profileController.changePassword(
			{
				oldPassword: this.formData.oldPassword,
				newPassword: this.formData.newPassword,
			},
			{
				success: () => {
					this.setProps({ responseResultInfo: "Пароль изменен", errorClass: "" });
				},
				error: (error) => {
					this.setProps({
						responseResultInfo: (error as any).reason,
						errorClass: "error",
					});
				},
			},
		);
	}

	private _generateInputs(inputs: any) {
		const formFieldsWithData = Object.keys(inputs).reduce(
			(acc: any, curr: string) => {
				return [
					...acc,
					{
						...userProfileFormFields[curr],
						textInput: {
							attributes: {
								...userProfileFormFields[curr].textInput.attributes,
								class: "border-none profile-info__input text-right",
							},
						},
					},
				];
			},
			[],
		);

		this.children.inputs = formFieldsWithData.map((dataItem, index): Block => {
			return new EditInputField({
				...dataItem,
				textInput: {
					...dataItem.textInput,
					hasDefaultClass: false,
					events: {
						blur: (event: Event) => this._onFocus(index, event),
						focus: (event: Event) => this._onFocus(index, event),
					},
				},
			});
		});

		this.children.saveButton = new Button({
			title: "Сохранить",
			attributes: { class: "full-w", type: "submit" },
		});
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
