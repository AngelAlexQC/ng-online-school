import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Editor } from "ngx-editor";
import { CourseClassTask } from "src/app/models/course-class-task";

@Component({
  selector: "app-course-class-task",
  templateUrl: "./course-class-task.component.html",
  styleUrls: ["./course-class-task.component.scss"],
})
export class CourseClassTaskComponent implements OnInit {
  @Input()
  task: CourseClassTask = new CourseClassTask();
  @Output() taskChanged = new EventEmitter<CourseClassTask>();
  @Output() taskDeleted = new EventEmitter<CourseClassTask>();
  editor: Editor = new Editor();
  constructor() {}

  ngOnInit(): void {}
  emit() {
    return this.taskChanged.emit(this.task);
  }
  emitDelete() {
    return this.taskDeleted.emit(this.task);
  }
}
