import { Component, Input, OnInit } from "@angular/core";
import { CourseClassTask } from "src/app/models/course-class-task";
import { User } from "src/app/models/user";
import { CoursesService } from "src/app/services/db/courses.service";

@Component({
  selector: "app-score-list",
  templateUrl: "./score-list.component.html",
  styleUrls: ["./score-list.component.scss"],
})
export class ScoreListComponent implements OnInit {
  @Input()
  enrollments: { student: User; student_tasks: any }[] = [];

  @Input()
  tasks: CourseClassTask[] = [];
  constructor(private courses: CoursesService) {}

  ngOnInit(): void {}
  changeStatus(task: CourseClassTask): void {
    task.status = !task.status;
    console.log(status);
  }
  saveStore(task: CourseClassTask): void {
    task.status = true;
    this.courses
      .saveStudentTask(task)
      .subscribe((data: any) => {
        console.log(data.data);
      });
  }
}
