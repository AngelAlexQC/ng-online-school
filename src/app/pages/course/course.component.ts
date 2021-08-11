import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Course } from "src/app/models/course";
import { AuthService } from "src/app/services/auth.service";
import { CoursesService } from "src/app/services/db/courses.service";

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.scss"],
})
export class CourseComponent implements OnInit {
  id!: number;
  course!: Course;
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
          console.log(course.data);
        },
        (error) => {
          switch (error.status) {
            case 404:
              this.router.navigate(["/404"]);
              console.log("Not found");
              break;
            case 401:
              this.router.navigate(["/login"]);
              console.log("Unauthorized");
              break;

            default:
              break;
          }
        }
      );
    });
  }
}
