import {SignUpTypes} from "../../../../shared/modules/signUp";

export type ChatItemType = {
	avatar: null;
	created_by: number;
	id: number;
	last_message: ChatItemLastMessage | null;
	title: string;
	unread_count: 0;
};

export type ChatItemLastMessage = {
	content: string;
	id: number;
	time: string;
	user:SignUpTypes
};
