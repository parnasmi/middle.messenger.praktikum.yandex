export type FileInputType = {
	events: {
		change: (e: Event) => void;
	};
};

export type AvatarUploadFormType = {
	selectedClass?: string;
	filename?: string;
	events: {
		submit: (e: Event) => void;
	};
	inputEvents: {
		change: (e: Event) => void;
	};
};
