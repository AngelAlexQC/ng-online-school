import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Editor } from "ngx-editor";
import { Course, CourseClass } from "src/app/models/course";
import { CourseClassTask } from "src/app/models/course-class-task";
import { CoursesService } from "src/app/services/db/courses.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-course-class-task-create",
  templateUrl: "./course-class-task-create.component.html",
  styleUrls: ["./course-class-task-create.component.scss"],
})
export class CourseClassTaskCreateComponent implements OnInit {
  @Input()
  public task!: CourseClassTask;

  @Input()
  course_classes: CourseClass[] = [];
  course!: Course;
  editor: Editor = new Editor();
  isNew: boolean = false;
  constructor(private courses: CoursesService, private router: Router) {
    this.isNew = true;
  }

  ngOnInit(): void {
    this.course = this.courses.getCurrentCourse();
  }

  saveTask() {
    if (!(this.task.id > 0)) {
      this.courses.saveTask(this.task).subscribe(
        (task: any) => {
          this.task = task.data;
          Swal.fire({
            title: "Hecho!",
            text: "Tarea Creada Correctamente",
            icon: "success",
            timer: 2000,
          });
          this.reload("course/" + this.course.id);
        },
        (error) => {
          Swal.fire("¡Error!", JSON.stringify(error), "error");
        }
      );
    } else {
      this.courses.updateTask(this.task).subscribe(
        (task: any) => {
          this.task = task.data;
          Swal.fire({
            title: "Hecho!",
            text: "Tarea Actualizada Correctamente",
            icon: "success",
            timer: 2000,
          });
          this.reload("course/" + this.course.id);
        },
        (error) => {
          Swal.fire("¡Error!", JSON.stringify(error), "error");
        }
      );
    }
  }

  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl(".", { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
  newTask() {
    this.task = new CourseClassTask();
    this.task.id = 0;
  }
}
