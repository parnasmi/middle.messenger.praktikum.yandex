import {
	HTTPMethods,
	HTTPOptions,
	XHRHTTPRequestResultType,
} from "./types";

type OptionsWithoutMethod = Omit<HTTPOptions, "method">;

const defaultOptions: HTTPOptions = {
	headers: {
		"Cache-Control": "no-cache",
		"content-type": "application/json",
	},
	timeout: 5000,
	data: null,
	method: HTTPMethods.GET,
	queryParams: {},
};

interface ClassParams {
	endPoint: string;
	baseUrl?: string;
}

const BASE_URL = "https://ya-praktikum.tech/api/v2";

export class HTTPTransport {
	// private defaultOptions: HTTPOptions
	// constructor(defaultOptions:HTTPOptions) {
	//   this.defaultOptions = defaultOptions
	// }
	readonly baseUrl: string;
	readonly endPoint: string;

	constructor(params: ClassParams) {
		this.baseUrl = params.baseUrl || BASE_URL;
		this.endPoint = params.endPoint;
	}

	public get = (url: string, options: OptionsWithoutMethod = {}) => {
		return this.request(
			url,
			{
				...options,
				method: HTTPMethods.GET,
			},
			options.timeout,
		);
	};
	public put = (url: string, options: OptionsWithoutMethod = {}) => {
		return this.request(
			url,
			{
				...options,
				method: HTTPMethods.PUT,
			},
			options.timeout,
		);
	};
	public post = (url: string, options: OptionsWithoutMethod = {}) => {
		return this.request(
			url,
			{
				...options,
				method: HTTPMethods.POST,
			},
			options.timeout,
		);
	};
	public delete = (url: string, options: OptionsWithoutMethod = {}) => {
		return this.request(
			url,
			{
				...options,
				method: HTTPMethods.DELETE,
			},
			options.timeout,
		);
	};

	private getXHRHTTPRequestResult = (
		xhr: XMLHttpRequest,
	): XHRHTTPRequestResultType => {
		return {
			ok: xhr.status >= 200 && xhr.status < 300,
			status: xhr.status,
			statusText: xhr.statusText,
			headers: xhr.getAllResponseHeaders(),
			data: xhr.responseText,
			json: <T>() => JSON.parse(xhr.responseText) as T,
		};
	};

	private request = (
		url: string,
		options: HTTPOptions = { method: HTTPMethods.GET },
		timeout = 5000,
	): Promise<XHRHTTPRequestResultType> => {
		const {
			headers,
			data = defaultOptions.data,
			method = defaultOptions.method,
			queryParams = defaultOptions.queryParams,
		} = options;


		const self = this;
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(
				options.method,
				queryParams
					? `${this.baseUrl}${this.endPoint}${url}${queryStringify(queryParams)}`
					: url,
				true,
			);
			xhr.withCredentials = true;
			const containedHeaders = { ...defaultOptions.headers, ...headers };
			const isMultiPartHeader =
				options?.headers?.["content-type"] === "multipart/form-data";
			const headerKeys = Object.keys(isMultiPartHeader ? {} : containedHeaders);

			if (headerKeys.length) {
				headerKeys.forEach((key) => {
					xhr.setRequestHeader(key, containedHeaders[key]);
				});
			}

			xhr.onload = function () {
				if (!(xhr.status >= 200 && xhr.status < 300)) {
					reject(self.getXHRHTTPRequestResult(xhr));
				}
				resolve(self.getXHRHTTPRequestResult(xhr));
			};

			xhr.timeout = timeout;

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === HTTPMethods.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	};
}

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: Record<string, string>) {
	// Можно делать трансформацию GET-параметров в отдельной функции
	if (typeof data !== "object") {
		throw new Error("data должен быть объектом");
	}
	const keys = Object.keys(data);
	if (!keys.length) return "";

	return keys.reduce((result, key, index) => {
		return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
	}, "?");
}
