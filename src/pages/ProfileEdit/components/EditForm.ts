import tmpl from './editForm.tmpl.hbs'
import {Button, EditInputField, Form} from "../../../shared/components";
import {Block} from "../../../shared/utils";
import {userProfileFormFields} from './userProfileFormFields'
import {SignUpTypes} from "../../../shared/modules/signUp";
import {ProfileController} from "../../../shared/modules/profile";
const profileController = new ProfileController()
export class EditForm extends Form<SignUpTypes> {
	constructor(props: any) {
		const { userProfileData } = props;

		super(props);
		this._generateInputs(userProfileFormFields, userProfileData);
	}
	async _onSend() {
		console.log("formData has been sent", this.formData);
		profileController.updateProfile(this.formData, {
			success:(data) => {
				console.log('updated data', data)
			},
			error:(error) => {
				console.log('update error', error)
			}
		});
	}
	private _generateInputs(inputs: any, userProfileData: any) {
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
								value: userProfileData[curr],
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
			// events: {
			// 	click: () => console.log("data saved"),
			// },
		});
	}
	componentDidUpdate(oldProps: any, newProps: any): boolean {
    this._generateInputs(userProfileFormFields, newProps.userProfileData);
		const normalizedFormValues = {...newProps.userProfileData};
		delete normalizedFormValues.id;
		delete normalizedFormValues.avatar;
		this.setFormValues(normalizedFormValues)
		return true;
	}

	render(): DocumentFragment {
		return this.compile(tmpl, this.props);
	}
}
