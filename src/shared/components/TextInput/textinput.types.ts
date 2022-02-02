export interface IInput {
  events?: {
   change:() => void,
   blur:() => void,
  };
  attributes?: {
    placeholder?:string;
    type?:string;
    disabled?: string;
    class?:string;
    name:string;
  }
}
