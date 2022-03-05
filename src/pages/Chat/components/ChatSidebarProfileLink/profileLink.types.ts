export interface IProfileLink {
	events?: {
		click: (e: Event) => void;
	};
	attributes?: {
		id?: string;
		class?: string;
		disabled?: string;
		href?: string;
	};
}
