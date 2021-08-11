import { Component, Input, OnInit } from "@angular/core";
import { CourseClassTask } from "src/app/models/course-class-task";

@Component({
  selector: "app-course-class-task",
  templateUrl: "./course-class-task.component.html",
  styleUrls: ["./course-class-task.component.scss"],
})
export class CourseClassTaskComponent implements OnInit {
  @Input()
  task: CourseClassTask = new CourseClassTask();
  constructor() {}

  ngOnInit(): void {}
}
