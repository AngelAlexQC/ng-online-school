import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { CourseClass } from "src/app/models/course";
import { CoursesService } from "src/app/services/db/courses.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { take, finalize } from "rxjs/operators";

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
  @Input()
  courseClass!: CourseClass;
  @Output() onCourseClassCreated = new EventEmitter();
  editingCourseClass: CourseClass = new CourseClass();

  isNew = false;
  constructor(private courses: CoursesService, private router: Router) {}

  ngOnInit(): void {}
  saveCourseClass() {
    Swal.showLoading();
    this.courseClass.course = this.courses.getCurrentCourse();
    if (this.isNew) {
      this.courses.saveCourseClass(this.courseClass).subscribe(
        (courseClass: any) => {
          this.courseClass = courseClass.data;
          Swal.fire({
            title: "Tarea exitosa!",
            text: "La tarea se ha modificado correctamente",
            icon: "success",
            timer: 2000,
          });
          Swal.showLoading();
          // get CourseClasses of Course
          this.courses
            .getCourse(this.courses.getCurrentCourse().id)
            .subscribe((course: any) => {
              Swal.showLoading();
              window.location.reload();
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
    } else {
      this.courses.updateCourseClass(this.courseClass).subscribe(
        (courseClass: any) => {
          this.courseClass = courseClass.data;
          Swal.fire({
            title: "Tarea exitosa!",
            text: "La tarea se ha modificado correctamente",
            icon: "success",
            timer: 2000,
          });
          Swal.showLoading();
          // get CourseClasses of Course
          this.courses
            .getCourse(this.courses.getCurrentCourse().id)
            .subscribe((course: any) => {
              Swal.showLoading();
              window.location.reload();
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
  }
  
  newCourseClass() {
    this.isNew = true;
    this.courseClass = new CourseClass();
    this.courseClass.thedate_start = new Date().toString().slice(0, 10);
    this.courseClass.thedate_start = new Date().toString().slice(0, 10);
    this.courseClass.hour_start = new Date().toString().slice(11, 15);
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
  public options = {
    fileUpload: false,
    imageUpload: true,
    imageUploadMethod: "POST",
    imageUploadURL: environment.upload,

    imageUploadParams: {
      id: "file",
      name: "file",
    },
  };
}
