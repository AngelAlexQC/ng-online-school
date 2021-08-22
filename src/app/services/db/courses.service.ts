import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { identity } from "cypress/types/lodash";
import { Course, CourseClass } from "src/app/models/course";
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

  saveTask(task: CourseClassTask) {
    Swal.showLoading();
    return this.http.post(
      environment.apiURL +
        "course-classes/" +
        task.course_class_id +
        "/course-class-tasks",
      task,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }

  updateTask(task: CourseClassTask) {
    Swal.showLoading();
    return this.http.put(environment.apiURL + "tasks/" + task.id, task, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  saveCourseClass(courseClass: CourseClass) {
    Swal.showLoading();
    return this.http.post(
      environment.apiURL +
        "courses/" +
        courseClass.course.id +
        "/course-classes",
      courseClass,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }
  updateCourseClass(courseClass: CourseClass) {
    Swal.showLoading();
    return this.http.put(
      environment.apiURL + "course-classes/" + courseClass.id,
      courseClass,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }
  deleteCourseClass(courseClass: CourseClass) {
    Swal.showLoading();
    return this.http.delete(
      environment.apiURL + "course-classes/" + courseClass.id,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }

  deleteTask(courseClassTask: CourseClassTask) {
    Swal.showLoading();
    return this.http.delete(
      environment.apiURL + "tasks/" + courseClassTask.id,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }

  enrollStudent(courseId: number, studentId: number) {
    return this.http.post(
      environment.apiURL + "enrollments/",
      {
        course_id: courseId,
        student_id: studentId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }
}
