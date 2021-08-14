import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Course } from "src/app/models/course";
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courses: CoursesService,
    private auth: AuthService
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

  setTask(i: number) {
    "Tarea de la clase " + (i + 1);
  }
  updateCourse(evt: any) {
    console.log(evt);
  }
}
