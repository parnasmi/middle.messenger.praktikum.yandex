export interface XHRHTTPRequestResultType {
  ok: boolean;
  status: number;
  statusText: string
  headers: string
  data: string;
  json: <T>() =>  T
}
