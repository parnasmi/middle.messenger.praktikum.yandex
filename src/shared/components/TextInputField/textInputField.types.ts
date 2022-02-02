export interface TextInputFieldTypes {
  attributes: {
    class: string;
  },
  showError: boolean;
  inputProps: {
    placeholder: string;
    events?: {
      change:() => void,
      blur:() => void,
    };
    name: string,
    type: string;
    class: string;
  }
}
  
