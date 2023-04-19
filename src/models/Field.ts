import { Problem } from "./Problem";

export class Field {
  id: number;
  fieldName: string;
  problems: Problem[];

  constructor(id: number, fieldName: string, problems: Problem[]) {
    this.id = id;
    this.fieldName = fieldName;
    this.problems = problems;
  }
}
