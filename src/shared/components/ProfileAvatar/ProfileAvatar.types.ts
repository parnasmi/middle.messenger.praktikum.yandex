export type ProfileAvatarTypes = {
  attributes?:{
    class?: string;
    'data-modal-target'?: string;
  },
  events?: {
    click:() => void;
  },
  avatarUrl: string | null;
}
