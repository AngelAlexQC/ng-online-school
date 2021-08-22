import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Course, CourseClass } from "src/app/models/course";
import { CourseClassTask } from "src/app/models/course-class-task";
import { AuthService } from "src/app/services/auth.service";
import { CoursesService } from "src/app/services/db/courses.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
})
export class CourseComponent implements OnInit {
  id!: number;
  course!: Course;

  currentTask!: CourseClassTask;
  courseClass!: CourseClass;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courses: CoursesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = (params as any).params.id;
      this.course = this.courses.course;
      this.courses.getCourse(this.id).subscribe(
        (course: any) => {
          this.course = course.data;
          this.course.course_classes = this.course.course_classes.sort(
            (a, b) => a.number - b.number
          );
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
    });
  }

  taskChanged(event: CourseClassTask) {
    this.currentTask = event;
    console.log(this.currentTask);
  }
  onCourseClassTaskCreated(courseClassTask: any) {
    this.courseClass = courseClassTask;
    this.courseClass.id = 0;
  }
  updateCourse(evt: any) {
    this.courses.setCurrentCourse(evt);
  }
  editCourseClass(courseClass: CourseClass) {
    this.courseClass = courseClass;
    this.courseClass.thedate_start = new Date().toString().slice(0, 10);
    this.courseClass.thedate_start = new Date().toString().slice(0, 10);
    this.courseClass.hour_start = new Date().toString().slice(11, 15);
  }
  deleteCourseClass(courseClass: CourseClass) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡No podrás recuperar esta clase!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Si, borrar!",
    }).then(() => {
      this.courses
        .deleteCourseClass(courseClass)
        .subscribe((courseClass: any) => {
          this.router.navigate(["/course", this.id]);
          window.location.reload();
        });
    });
  }
  taskDeleted(courseClassTask: CourseClassTask) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡No podrás recuperar esta tarea!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Si, borrar!",

      cancelButtonText: "Cancelar",
    }).then(() => {
      this.courses
        .deleteTask(courseClassTask)
        .subscribe((courseClassTask: any) => {
          this.router.navigate(["/course", this.id]);
          window.location.reload();
        });
    });
  }
}
