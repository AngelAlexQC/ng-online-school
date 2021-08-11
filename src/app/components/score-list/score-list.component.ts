import { Component, Input, OnInit } from "@angular/core";
import { User } from "src/app/models/user";

@Component({
  selector: "app-score-list",
  templateUrl: "./score-list.component.html",
  styleUrls: ["./score-list.component.scss"],
})
export class ScoreListComponent implements OnInit {
  @Input()
  enrollments: { student: User; student_tasks: any }[] = [];
  constructor() {}

  ngOnInit(): void {}
}
