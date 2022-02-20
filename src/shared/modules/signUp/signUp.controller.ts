import { SignUpApi } from "../http";
import { SignUpTypes } from "./signUp.types";
import { XHRHTTPRequestResultType } from "../../utils/HTTPTransport/types";
import { IFormCallback } from "../types";
import { initializePrivateRoutes } from "../../../index";
import { Router } from "../../utils";
import { AuthController } from "../auth";

const signUpApi = new SignUpApi();
const router = new Router("#root");
const authController = new AuthController();

export class SignUpController {
	public async register(data: SignUpTypes, cb?: IFormCallback) {
		try {
			await signUpApi.create(data);
			const userData = await authController.getUser();
			initializePrivateRoutes();
			router.go("/chat");
			cb?.success!(userData);
		} catch (e: unknown) {
			//Логика обработки ошибки
			cb?.error!((e as XHRHTTPRequestResultType).json());
		} finally {
			cb?.finally!();
		}
	}
}
