import { HTTPMethods, HTTPOptions } from "./types";

type OptionsWithoutMethod = Omit<HTTPOptions, "method">;

const defaultOptions:HTTPOptions = {
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  },
  timeout: 5000,
  data: null,
  method: HTTPMethods.GET
}

class HTTPTransport {
  public get = (url:string, options:OptionsWithoutMethod = {}):Promise<XMLHttpRequest> => {

    return this.request(url, {
      ...options,
      method: HTTPMethods.GET
    }, options.timeout);
  };
  public put = (url:string, options:OptionsWithoutMethod = {}):Promise<XMLHttpRequest> => {
    return this.request(url, {
      ...options,
      method: HTTPMethods.PUT
    }, options.timeout);
  };
  public post = (url:string, options:OptionsWithoutMethod = {}):Promise<XMLHttpRequest> => {
    return this.request(url, {
      ...options,
      method: HTTPMethods.POST
    }, options.timeout);
  }
  public delete = (url:string, options:OptionsWithoutMethod = {}):Promise<XMLHttpRequest> => {
    return this.request(url, {
      ...options,
      method: HTTPMethods.DELETE
    }, options.timeout);
  }

  private request = (url:string, options:HTTPOptions = {method: HTTPMethods.GET}, timeout = 5000):Promise<XMLHttpRequest> => {
    const {
      headers = {...defaultOptions.headers},
      data = defaultOptions.data,
      method = defaultOptions.method
    } = options;



    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(options.method, method === HTTPMethods.GET ? `${url}${queryStringify(data)}` : url)
      const headerKeys = Object.keys(headers);

      if (headerKeys.length) {
        headerKeys.forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        })
      }

      xhr.onload = function() {
        resolve(xhr)
      }

      xhr.timeout = timeout;

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === HTTPMethods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }

    })

  };
}

export const httpRequest = new HTTPTransport()


/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data:Record<string, string>) {
  // Можно делать трансформацию GET-параметров в отдельной функции
  if (typeof data !== 'object') {
    throw new Error('data должен быть объектом')
  }
  const keys = Object.keys(data);
  if (!keys.length) return '';


  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

