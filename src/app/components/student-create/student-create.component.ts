import { Component, Input, OnInit } from "@angular/core";
import { Paginated } from "src/app/models/paginated";
import { User } from "src/app/models/user";
import { CoursesService } from "src/app/services/db/courses.service";
import { UsersService } from "src/app/services/db/users.service";

@Component({
  selector: "app-student-create",
  templateUrl: "./student-create.component.html",
  styleUrls: ["./student-create.component.scss"],
})
export class StudentCreateComponent implements OnInit {
  @Input() courseId: number = 0;
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
  constructor(private courses: CoursesService, private users: UsersService) {}

  ngOnInit(): void {
    this.getAllStudents();
  }

  enrollStudent(studentId: number) {
    this.courses.enrollStudent(this.courseId, studentId).subscribe((res) => {
      console.log(res);
    });
  }

  getAllStudents() {
    this.users.getAllUsers().subscribe((res: Paginated) => {
      this.students = res.data;
    });
  }
}
