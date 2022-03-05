import { HTTPMethods } from "./HTTPMethods";

export type HTTPOptions = {
	method: HTTPMethods;
	data?: any;
	headers?: Record<string, string>;
	timeout?: number;
	queryParams?: Record<string, string>;
};
