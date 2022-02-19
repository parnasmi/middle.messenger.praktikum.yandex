import {XHRHTTPRequestResultType} from "../../utils/HTTPTransport/types";

export class BaseApi {
  // eslint-disable-next-line no-unused-vars
  create(data:any):Promise<XHRHTTPRequestResultType>{
    throw new Error('Not implemented')
  }
  request(){
    throw new Error('Not implemented')
  }
  update(){
    throw new Error('Not implemented')
  }
  delete(){
    throw new Error('Not implemented')
  }
}
