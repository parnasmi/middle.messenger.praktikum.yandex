export type ChatMessageType = {
	id: number;
	time: string;
	user_id: number;
	type: "message" | "file";
	content: string;
	currentUserId: number;
	file?: {
		id: number;
		user_id: number;
		path: string;
		filename: string;
		content_type: string;
		content_size: number;
		upload_date: string;
	};
};
