export type Tuple = {
  states: Array<string>;
  alphabet: Array<string>;
  initState: string;
  finState: string;
  transFunction: string;
  tapeDelimitator: string;
  blank: string;
  nonFinalStates: Array<string>;
  tapeAlphabet: Array<string>; 
};
