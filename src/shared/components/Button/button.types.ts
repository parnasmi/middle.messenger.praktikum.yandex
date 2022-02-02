export interface IButton {
  title: string;
  events?: {
   click:() => void
  };
  attributes?: {
    id?:string;
    class?:string;
    disabled?: string;
    type: 'submit' | 'reset' | 'button';
  }
}
