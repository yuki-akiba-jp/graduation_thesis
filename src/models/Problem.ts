export class Problem {
  id: number;
  problemName: string;
  description: string;
  answers: string[];
  choices: string[];

  constructor(
    id: number,
    problemname: string,
    description: string,
    answers: string[],
    choices: string[]
  ) {
    this.id = id;
    this.problemname = problemname;
    this.description = description;
    this.answers = answers;
    this.choices = choices;
  }
}
