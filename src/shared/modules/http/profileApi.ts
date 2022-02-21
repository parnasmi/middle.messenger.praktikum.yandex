import { BaseApi } from "./baseApi";
import { HTTPTransport } from "../../utils";
import { SignUpTypes } from "../signUp";

const profileApiInstance = new HTTPTransport({ endPoint: "/user/profile" });

export class ProfileApi extends BaseApi {
	public uploadAvatar(form: any) {
		return profileApiInstance.put("/avatar", { data: form });
	}

	public updateProfile(formData: SignUpTypes) {
		return profileApiInstance.put("/", {
			data: JSON.stringify(formData),
			headers: { "content-type": "application/json" },
		});
	}
}
