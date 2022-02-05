export interface IInput {
  events?: {
   focus:(e:Event) => void,
   blur:(e:Event) => void,
  };
  attributes?: {
    placeholder?:string;
    type?:string;
    disabled?: string;
    class?:string;
    name:string;
    value?:string;
    required?:boolean;
  }
}
