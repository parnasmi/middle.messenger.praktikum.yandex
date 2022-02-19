import {SignUpApi} from "../http";
import {SignUpTypes} from "./signUp.types";
import {XHRHTTPRequestResultType} from "../../utils/HTTPTransport/types";
import {IFormCallback} from "../types";
import {privateRoutes} from "../../../index";
import {Router} from "../../utils";

const signUpApi = new SignUpApi();
const router = new Router('#root');
export class SignUpController {

  public async register(data: SignUpTypes, cb?:IFormCallback) {
    try {
      console.log('register data', data)
       await signUpApi.create(data);
      const userData = await signUpApi.request();
      console.log('userData', userData.json())
      privateRoutes()
      router.go('/chat')
      cb?.success!(userData.json());
    } catch(e:unknown) {
      //Логика обработки ошибки
      console.log('ошибка регистрации',e)
      cb?.error!((e as XHRHTTPRequestResultType).json());
    } finally {
      cb?.finally!()
    }
  }
}
