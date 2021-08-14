import { Component, EventEmitter, OnInit, Output } from "@angular/core";
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
  date_start!: string;
  date_end!: string;
  hour_start!: string;
  hour_end!: string;
  courseClass!: any;
  @Output() onCourseClassCreated = new EventEmitter();
  constructor(private courses: CoursesService, private router: Router) {
    this.courseClass = new CourseClass();
    this.courseClass.thedate_start = new Date().toString().slice(0, 10);
  }

  ngOnInit(): void {
    this.courseClass.thedate_start = new Date().toString().slice(0, 10);
    this.courseClass.hour_start = new Date().toString().slice(11, 15);
    this.courseClass.name = "Nombre";
  }
  saveCourseClass() {
    Swal.showLoading();
    this.courseClass.course_id = this.courseClass.course.id;
    this.courses.saveCourseClass(this.courseClass).subscribe(
      (courseClass: any) => {
        this.courseClass = courseClass.data;
        Swal.fire({
          title: "Tarea exitosa!",
          text: "La tarea se ha creado correctamente",
          icon: "success",
          timer: 2000,
        });
        Swal.showLoading();
        // get CourseClasses of Course
        this.courses
          .getCourse(this.courses.getCurrentCourse().id)
          .subscribe((course: any) => {
            Swal.showLoading();

            this.courseClass.course = course.data;
            this.courses.setCurrentCourse(course.data);
            this.onCourseClassCreated.emit(this.courseClass);
            this.reload("/course/" + this.courseClass.course.id);
          });
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
  // Change the hour of date_start field
  changeStartHour(hour: string) {
    this.courseClass.date_start = new Date(
      this.courseClass.thedate_start.toLocaleString().slice(0, 10) +
        " " +
        this.courseClass.hour_start
    );
  }
  changeStartDate(date: string) {
    this.courseClass.date_start = new Date(
      new Date(
        new Date(new Date(date).setDate(new Date(date).getDate() + 1))
      ).setHours(new Date(date).getHours() + 1)
    );
    // get Hour an minute of date_start field
    this.courseClass.hour_start = this.courseClass.date_start
      .toLocaleString()
      .slice(10, 15);
  }

  changeEndHour(hour: string) {
    this.courseClass.date_end = new Date(
      this.courseClass.thedate_end.toLocaleString().slice(0, 10) +
        " " +
        this.courseClass.hour_end
    );
  }
  changeEndDate(date: string) {
    this.courseClass.date_end = new Date(
      new Date(
        new Date(new Date(date).setDate(new Date(date).getDate() + 1))
      ).setHours(new Date(date).getHours() + 1)
    );

    // get Hour an minute of date_end field
    this.courseClass.hour_end = this.courseClass.date_end
      .toLocaleString()
      .slice(10, 15);
  }
  async reload(url: string): Promise<boolean> {
    Swal.showLoading();
    await this.router.navigateByUrl(".", { skipLocationChange: true });
    Swal.close();
    return this.router.navigateByUrl(url);
  }
}
