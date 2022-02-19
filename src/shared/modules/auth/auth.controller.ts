import {AuthApi} from "../http";
import {AuthProfileTypes} from "./auth.types";
import {IFormCallback} from "../types";
import {XHRHTTPRequestResultType} from "../../utils/HTTPTransport/types";
import {Router} from "../../utils";
import {privateRoutes} from "../../../index";

const authApi = new AuthApi();
const router = new Router('#root')
export class AuthController {
 public async signIn(loginData:AuthProfileTypes, cb?:IFormCallback) {
  try {
    const data = await authApi.create(loginData);
    const userData = await authApi.getme();
    cb?.success!(userData.json());
    privateRoutes()
    router.go('/chat')
    console.log('sign in data', {data, userData})
  } catch (e:unknown) {
   console.error('sign in error', e)
    cb?.error!((e as XHRHTTPRequestResultType).json());
  }
 }
 public async logout() {
   try {
     await authApi.logout()
   } catch (e) {
    console.error('error occured while logout')
   }
 }

 public async getUser() {
   await authApi.getme()
 }
}

