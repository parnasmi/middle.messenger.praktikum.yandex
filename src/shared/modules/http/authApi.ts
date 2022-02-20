import { BaseApi } from "./baseApi";
import { HTTPTransport } from "../../utils";
import { AuthProfileTypes } from "../auth/auth.types";

const authHttpInstance = new HTTPTransport({ endPoint: "/auth" });

export class AuthApi extends BaseApi {
	create(loginData: AuthProfileTypes) {
		return authHttpInstance.post("/signin", {
			data: JSON.stringify(loginData),
			headers: {"content-type": "application/json"},
		});
	}
	getme() {
		return authHttpInstance.get('/user', {})
	}
	logout() {
		return authHttpInstance.post('/logout', {})
	}
}
