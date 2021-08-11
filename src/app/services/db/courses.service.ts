import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { identity } from "cypress/types/lodash";
import { Course } from "src/app/models/course";
import { CourseClassTask } from "src/app/models/course-class-task";
import { Paginated } from "src/app/models/paginated";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private apiUrl = environment.apiURL + "courses";
  courses!: Paginated;
  course!: Course;

  constructor(private http: HttpClient, private router: Router) {}

  getAllCourses() {
    return this.http.get<any>(this.apiUrl);
  }
  setCourses(courses: Paginated) {
    this.courses = courses;
  }
  getCourses() {
    return this.courses;
  }
  getCourse(id: number) {
    return this.http.get<any>(this.apiUrl + "/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }
  getCurrentCourse() {
    return localStorage.getItem("course")
      ? JSON.parse(localStorage.getItem("course") || "null")
      : null;
  }
  setCurrentCourse(course: Course) {
    this.course = course;
    localStorage.setItem("course", JSON.stringify(course));
    this.router.navigate(["/course", course.id]);
  }
  saveStudentTask(task: CourseClassTask) {
    Swal.showLoading();
    return this.http.put(
      environment.apiURL +
        "users/" +
        task.student_id +
        "/student-tasks/" +
        task.id,
      task,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }
}
