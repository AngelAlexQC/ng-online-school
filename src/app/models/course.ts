import { CourseClassTask } from "./course-class-task";
import { User } from "./user";

export class Course {
  id: number = 1;
  name: string = "";
  parallel_name: string = "";
  teacher!: User;
  period!: Period;
  course_classes: CourseClass[] = [];
  enrollments!: { student: User; student_tasks: CourseClassTask[] }[];
  tasks: CourseClassTask[] = [];
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
  the_date_start: Date = new Date();
  date_start: Date = new Date();
  date_end: Date = new Date();
  the_date_end: Date = new Date();
  parallel_name!: string;
  content!: string;
  description!: string;
  course_class_tasks: CourseClassTask[] = [];
  course: Course = new Course();
  number: any;
  thedate_start!: string;
  hour_start!: string;
  thedate_end: any;
  hour_end!: string;
}
