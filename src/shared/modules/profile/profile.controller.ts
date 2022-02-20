import {IFormCallback} from "../types";
import {AuthController} from "../auth";
import {XHRHTTPRequestResultType} from "../../utils/HTTPTransport/types";

export class ProfileController {
  public async getProfile(cb?:IFormCallback) {
    try {
      const userData = await new AuthController().getUser();
      cb?.success!(userData);
    } catch (e:unknown) {
      cb?.error!((e as XHRHTTPRequestResultType).json);
    }
  }
}
