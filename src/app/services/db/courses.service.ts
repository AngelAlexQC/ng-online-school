import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Course } from "src/app/models/course";
import { Paginated } from "src/app/models/paginated";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private apiUrl = environment.apiURL + "courses";
  courses!: Paginated;
  course!: Course;

  constructor(private http: HttpClient) {}

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
    return this.http.get<any>(this.apiUrl + "/" + id);
  }
  getCurrentCourse() {
    return this.course;
  }
  setCurrentCourse(course: Course) {
    this.course = course;
    localStorage.setItem("course", JSON.stringify(course));
  }
}
