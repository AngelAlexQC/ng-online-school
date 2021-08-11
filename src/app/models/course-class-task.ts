import { Course, CourseClass } from "./course";

export class CourseClassTask {
  id!: number;
  name!: string;
  content!: string;
  description!: string;
  file!: string;
  status!: boolean;
  score!: number;
  date_start!: string;
  student_id!: number;
  task_id!: number;
  course_class: CourseClass = new CourseClass();
  task: any;
}
