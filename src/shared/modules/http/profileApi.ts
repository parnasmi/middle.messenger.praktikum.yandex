import { BaseApi } from "./baseApi";
import { HTTPTransport } from "../../utils";
import { SignUpTypes } from "../signUp";
import { PassWordFormType } from "./http.types";

const profileApiInstance = new HTTPTransport({ endPoint: "/user" });

export class ProfileApi extends BaseApi {
	public uploadAvatar(form: any) {
		return profileApiInstance.put("/profile/avatar", {
			data: form,
			headers: { "content-type": "multipart/form-data" }
		});
	}

	public updateProfile(formData: SignUpTypes) {
		return profileApiInstance.put("/profile", {
			data: JSON.stringify(formData),
		});
	}

	public changePassword(passwordData: PassWordFormType) {
		return profileApiInstance.put("/password", {
			data: JSON.stringify(passwordData),
		});
	}
}
