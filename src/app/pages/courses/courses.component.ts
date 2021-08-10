import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Course } from "src/app/models/course";
import { Paginated } from "src/app/models/paginated";
import { AuthService } from "src/app/services/auth.service";
import { CoursesService } from "src/app/services/db/courses.service";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  courses: any;
  constructor(
    private coursesService: CoursesService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe((courses: Paginated) => {
      this.coursesService.setCourses(courses);
      this.courses = this.coursesService.getCourses().data;
    });
  }

  canCreateCourses() {
    return this.auth.canCreateCourses();
  }
  setCourse(course: Course) {
    this.coursesService.setCurrentCourse(course);
  }
}
