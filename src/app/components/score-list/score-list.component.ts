import { Component, Input, OnInit } from "@angular/core";
import { CourseClassTask } from "src/app/models/course-class-task";
import { User } from "src/app/models/user";

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
  constructor() {}

  ngOnInit(): void {}
  changeStatus(task: CourseClassTask): void {
    task.status = !task.status;
    console.log(status);
  }
}
