import { Component, OnInit } from "@angular/core";
import { CoursesService } from "./../../../services/db/courses.service";
import { Paginated } from "src/app/models/paginated";
import { Course } from "src/app/models/course";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  courses: any;
  course: any;
  constructor(
    private coursesService: CoursesService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe((courses: Paginated) => {
      this.coursesService.setCourses(courses);
      this.courses = this.coursesService.getCourses().data;
    });
  }
  setCourse(course: Course): void {
    this.course = course;
    this.coursesService.setCurrentCourse(course);
    this.router.navigate(["/course", course.id]);
  }
}
