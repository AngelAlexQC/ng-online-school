import { User } from "./user";

export class Course {
  id: number = 1;
  name: string = "";
  teacher!: User;
  period!: Period;
}

export class Period {
  id!: number;
  end_date!: Date;
  name!: string;
  school_id!: number;
  start_date!: Date;
  status!: true;
}
