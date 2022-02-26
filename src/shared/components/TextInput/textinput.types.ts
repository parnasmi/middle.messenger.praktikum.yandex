export interface IInput {
  events?: {
    // eslint-disable-next-line no-unused-vars
   focus?:(e:Event) => void,
    // eslint-disable-next-line no-unused-vars
   blur?:(e:Event) => void,
    // eslint-disable-next-line no-unused-vars
   change?:(e:Event) => void,
    // eslint-disable-next-line no-unused-vars
   input?:(e:Event) => void
  };
  attributes?: {
    placeholder?:string;
    type?:string;
    disabled?: string;
    class?:string;
    name:string;
    value?:string;
    required?:boolean;
    autocomplete?:string;
  },
  hasDefaultClass?: boolean
}
