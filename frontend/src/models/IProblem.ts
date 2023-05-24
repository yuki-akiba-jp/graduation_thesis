export interface IProblem {
  _id: string;
  name: string;
  description: string;
  questions: string[];
  answer: string;
  choices: string[];
  selectedChoice: string;
  reward: number;
}