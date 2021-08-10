import { Component, Input, OnInit } from "@angular/core";
import { CourseClass } from "src/app/models/course";

@Component({
  selector: "app-course-class",
  templateUrl: "./course-class.component.html",
  styleUrls: ["./course-class.component.scss"],
})
export class CourseClassComponent implements OnInit {
  @Input()
  courseClass!: CourseClass;
  constructor() {}

  ngOnInit(): void {}
}
