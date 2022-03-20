import { BaseApi } from "./baseApi";
import { HTTPTransport } from "../../utils";
import { SignUpTypes } from "../signUp";

const signUpHttpInstance = new HTTPTransport({ endPoint: "/auth" });

export class SignUpApi extends BaseApi {
	create(signUpData: SignUpTypes) {
		const data = {...signUpData};
		delete (data as any).retypePassword;
		return signUpHttpInstance.post("/signup", {
			data: JSON.stringify(data),
			headers: {
				mode: "cors",
				credentials: "true"
			},
		});
	}

	request() {
		return signUpHttpInstance.get("/user", {});
	}
}
