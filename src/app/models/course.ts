import { User } from "./user";

export class Course {
  id: number = 1;
  name: string = "";
  teacher!: User;
  period!: Period;
  course_classes: CourseClass[] = [];
}

export class Period {
  id!: number;
  end_date!: Date;
  name!: string;
  school_id!: number;
  start_date!: Date;
  status!: true;
}

export class CourseClass {
  id!: number;
  course_id!: number;
  name!: string;
  content!: string;
  description!: string;
}
