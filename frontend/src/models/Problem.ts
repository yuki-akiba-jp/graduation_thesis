export class Problem {
  id: number;
  problemName: string;
  description: string;
  answers: string[];
  choices: string[];

  constructor(
    id: number,
    problemName: string,
    description: string,
    answers: string[],
    choices: string[]
  ) {
    this.id = id;
    this.problemName = problemName;
    this.description = description;
    this.answers = answers;
    this.choices = choices;
  }
}
