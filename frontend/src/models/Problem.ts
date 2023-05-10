export interface Problem {
  _id: string;
  name: string;
  description: string;
  questions: string[];
  answers: string[];
  choices: string[];
  selectedChoices: string[];
  score: number;
}
