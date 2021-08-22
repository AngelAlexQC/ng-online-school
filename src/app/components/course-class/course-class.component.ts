import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Editor, toHTML } from "ngx-editor";
import { CourseClass } from "src/app/models/course";

@Component({
  selector: "app-course-class",
  templateUrl: "./course-class.component.html",
  styleUrls: ["./course-class.component.scss"],
})
export class CourseClassComponent implements OnInit {
  @Input()
  courseClass!: CourseClass;
  @Output() courseClassChanged = new EventEmitter<CourseClass>();
  @Output() courseClassDeleted = new EventEmitter<CourseClass>();
  editor: Editor = new Editor();

  constructor() {}

  ngOnInit(): void {}

  emit() {
    return this.courseClassChanged.emit(this.courseClass);
  }
  emitDelete() {
    return this.courseClassDeleted.emit(this.courseClass);
  }
}
