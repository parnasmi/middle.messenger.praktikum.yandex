import {IFormCallback} from "../types";
import {AuthController} from "../auth";
import {XHRHTTPRequestResultType} from "../../utils/HTTPTransport/types";
import {ProfileApi} from "../http";

const profileApi = new ProfileApi()

export class ProfileController {
  public async getProfile(cb?:IFormCallback) {
    try {
      const userData = await new AuthController().getUser();
      cb?.success!(userData);
    } catch (e:unknown) {
      cb?.error!((e as XHRHTTPRequestResultType).json);
    }
  }
  
  public async uploadAvatar(data: any, cb:IFormCallback) {
    try {
      const response = await profileApi.uploadAvatar(data);
      cb.success!(response.json());
    } catch (e) {
      cb.error!((e as XHRHTTPRequestResultType).json())
    }
  }
}
