import { BaseApi } from "./baseApi";
import { HTTPTransport } from "../../utils";
import { SignUpTypes } from "../signUp";
import {PassWordFormType} from "./http.types";

const profileApiInstance = new HTTPTransport({ endPoint: "/user" });

export class ProfileApi extends BaseApi {
	public uploadAvatar(form: any) {
		return profileApiInstance.put("/profile/avatar", { data: form });
	}

	public updateProfile(formData: SignUpTypes) {
		return profileApiInstance.put("/profile", {
			data: JSON.stringify(formData),
			headers: { "content-type": "application/json" },
		});
	}

	public changePassword(passwordData: PassWordFormType) {
		return profileApiInstance.put("/password", {
			data: JSON.stringify(passwordData),
			headers: {
				"content-type": "application/json",
			},
		});
	}
}
