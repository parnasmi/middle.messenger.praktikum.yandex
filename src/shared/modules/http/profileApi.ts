import {BaseApi} from "./baseApi";
import {HTTPTransport} from "../../utils";
const profileApiInstance = new HTTPTransport({endPoint: '/user/profile'})
export class ProfileApi extends BaseApi {
  public uploadAvatar(form:any) {
    return profileApiInstance.put('/avatar', {data:form})
  }
}
