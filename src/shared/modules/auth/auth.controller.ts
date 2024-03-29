import { AuthApi } from "../http";
import { AuthProfileTypes } from "./auth.types";
import { IFormCallback } from "../types";
import { XHRHTTPRequestResultType } from "../../utils/HTTPTransport/types";
import { Router } from "../../utils";
import {
	initializePrivateRoutes,
	initializePublicRoutes,
} from "../../../index";
import store from "../../store";

const authApi = new AuthApi();
const router = new Router("#root");

export class AuthController {
	public async signIn(loginData: AuthProfileTypes, cb?: IFormCallback) {
		try {
			const data = await authApi.create(loginData);
			const userData = await this.getUser();
			cb?.success!(userData);
			initializePrivateRoutes();
			router.go("/messenger");
			// console.log("sign in data", { data, userData });
		} catch (e: unknown) {
			console.error("sign in error", e);
			cb?.error!((e as XHRHTTPRequestResultType).json());
		} finally {
			cb?.finally!();
		}
	}

	public async logout(cb: IFormCallback) {
		try {
			await authApi.logout();
			initializePublicRoutes();
			cb?.success!();
		} catch (e) {
			console.error("error occured while logout");
		}
	}

	public async getUser() {
		try {
			const data = await authApi.getme();
			const userdata = data.json();
			store.initialSet("user", userdata);
			return userdata;
		} catch (e) {
			// console.error("error while fetching user1", e);
			initializePublicRoutes();
			if (document.location.pathname === "/sign-up") {
				router.go("/sign-up");
				return;
			}
			router.go("/");
			throw new Error('hello error');
		}
	}
}
