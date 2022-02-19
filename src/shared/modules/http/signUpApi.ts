import { BaseApi } from "./baseApi";
import { HTTPTransport } from "../../utils";
import { SignUpTypes } from "../signUp";

const signUpHttpInstance = new HTTPTransport({ endPoint: "/auth" });

export class SignUpApi extends BaseApi {
	create(signUpData: SignUpTypes) {
		return signUpHttpInstance.post("/signup", {
			data: signUpData,
			headers: {
				mode: "cors",
				credentials: "true",
				"content-type": "application/json",
			},
		});
	}

	request() {
		return signUpHttpInstance.get("/user", {
			headers: { mode: "cors", credentials: "include" },
		});
	}
}
