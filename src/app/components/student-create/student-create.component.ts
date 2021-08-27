import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Paginated } from "src/app/models/paginated";
import { User } from "src/app/models/user";
import { CoursesService } from "src/app/services/db/courses.service";
import { UsersService } from "src/app/services/db/users.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-student-create",
  templateUrl: "./student-create.component.html",
  styleUrls: ["./student-create.component.scss"],
})
export class StudentCreateComponent implements OnInit {
  @Input() courseId!: number;
  @Input() enrollments: { student: User }[] = [];
  students: User[] = [];
  student: User = {
    id: 0,
    name: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    profile_photo_path: "",
    roles: [{ name: "Student" }],
  };
  constructor(
    private courses: CoursesService,
    private users: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllStudents();
  }

  enrollStudent(studentId: number) {
    this.courses
      .enrollStudent(this.courseId, studentId)
      .subscribe(async (res) => {
        await Swal.fire({
          title: "Operación exitosa",
          text: "Estudiante matriculado",
          icon: "success",
          timer: 1500,
        });
        this.reload("course/" + this.courses.getCurrentCourse().id);
      });
  }

  getAllStudents() {
    this.users.getAllUsers().subscribe((res: Paginated) => {
      this.students = res.data.map((user) => {
        // Return only users that are not in enrollments
        if (
          this.enrollments.findIndex(
            (enrollment) => enrollment.student.id === user.id
          ) === -1
        ) {
          return user;
        }
      });
      // Sort students by id
      this.students = this.students.sort((a, b) => a.id - b.id);
    });
  }
  async reload(url: string): Promise<boolean> {
    Swal.showLoading();
    await this.router.navigateByUrl(".", { skipLocationChange: true });
    Swal.close();
    return this.router.navigateByUrl(url);
  }
}
