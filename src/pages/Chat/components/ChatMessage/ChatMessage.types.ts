export type ChatMessageType = {
  type: 'TEXT' | 'IMAGE';
  message: string;
  sent_time: string;
  from_user: {
    first_name: string;
    last_name: string;
    id: number;
  },
  file: null | MessageFileType

}

type MessageFileType = {
  url: string;
}
