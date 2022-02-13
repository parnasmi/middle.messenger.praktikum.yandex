export interface IElement {
  tagName:string;
  title: string;
  events?: {
   click:(e:Event) => void
  };
  attributes?: {
    id?:string;
    class?:string;
    disabled?: string;
    href?:string;
  }
}
