import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CourseClass } from "src/app/models/course";
import { CoursesService } from "src/app/services/db/courses.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-course-class-create",
  templateUrl: "./course-class-create.component.html",
  styleUrls: ["./course-class-create.component.scss"],
})
export class CourseClassCreateComponent implements OnInit {
  courseClass!: any;
  constructor(private courses: CoursesService, private router: Router) {}

  ngOnInit(): void {}
  saveCourseClass() {
    this.courses.saveCourseClass(this.courseClass).subscribe(
      (courseClass: any) => {
        this.courseClass = courseClass.data;
        Swal.fire("¡Hecho!", "La tarea se ha creado correctamente", "success");
      },
      (error) => {
        switch (error.status) {
          case 404:
            this.router.navigate(["/404"]);
            break;
          case 401:
            this.router.navigate(["/login"]);
            break;

          default:
            break;
        }
      }
    );
  }
  newCourseClass() {
    this.courseClass = new CourseClass();
  }
}
