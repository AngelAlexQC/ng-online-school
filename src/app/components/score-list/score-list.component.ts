import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CourseClassTask } from "src/app/models/course-class-task";
import { User } from "src/app/models/user";
import { CoursesService } from "src/app/services/db/courses.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-score-list",
  templateUrl: "./score-list.component.html",
  styleUrls: ["./score-list.component.scss"],
})
export class ScoreListComponent implements OnInit {
  @Input()
  enrollments: { student: User; student_tasks: any }[] = [];

  @Input()
  tasks: CourseClassTask[] = [];
  visibleTasks: CourseClassTask[] = [];
  constructor(private courses: CoursesService, private router: Router) {}

  ngOnInit(): void {}
  changeStatus(task: CourseClassTask): void {
    task.status = !task.status;
  }
  saveStore(task: CourseClassTask): void {
    task.status = true;
    this.courses.saveStudentTask(task).subscribe((data: any) => {
      // Show success message and reload page
      Swal.fire({
        title: "Success!",
        text: "Task has been saved.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      }).then(() => {
        task = data.data;
        this.reload("course/" + task.task.course_class.course.id);
      });
    });
  }
  async reload(url: string): Promise<boolean> {
    await this.router.navigateByUrl(".", { skipLocationChange: true });
    return this.router.navigateByUrl(url);
  }
  toogleVisible(task: CourseClassTask): void {
    task.visible = !task.visible;
    this.visibleTasks = this.tasks.filter(
      (t: CourseClassTask) => t.visible == true
    );
    console.log(this.visibleTasks);
  }
}
