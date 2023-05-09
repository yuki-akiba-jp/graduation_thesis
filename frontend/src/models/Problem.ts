export interface Problem {
  _id: string;
  name: string;
  description: string;
  questions: string[];
  answers: string[];
  choices: string[];
  selectableChoices: string[];
  score: number;
}
