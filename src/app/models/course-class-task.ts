import { Course, CourseClass } from "./course";

export class CourseClassTask {
  id!: number;
  name!: string;
  content!: string;
  description!: string;
  file!: string;
  status!: boolean;
  score!: number;
  date_start!: Date;
  student_id!: number;
  task_id!: number;
  course_class: CourseClass = new CourseClass();
  task: any;
  course_id!: number;
  date_end!: Date;
  number!: number;
  course_class_id!: number;
  visible = true;
}
