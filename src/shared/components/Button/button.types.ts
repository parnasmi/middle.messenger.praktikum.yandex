export interface IButton {
  title: string;
  events?: {
   click:(e:Event) => void
  };
  attributes?: {
    id?:string;
    class?:string;
    disabled?: string;
    type: 'submit' | 'reset' | 'button';
  }
}
