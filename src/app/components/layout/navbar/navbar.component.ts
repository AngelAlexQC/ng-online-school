import { Component, OnInit } from "@angular/core";
import { School } from "src/app/models/school";
import { environment } from "src/environments/environment";
import { SchoolsService } from "./../../../services/db/schools.service";
import { Paginated } from "src/app/models/paginated";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  schools!: School[];
  school: School = new School();
  constructor(private schoolsService: SchoolsService) {}

  ngOnInit(): void {
    this.schoolsService.getAllSchools().subscribe((schools: Paginated) => {
      this.schoolsService.setSchools(schools);
      this.schools = this.schoolsService.getSchools().data;
      this.setSchool(
        (localStorage.getItem("school") as any)
          ? JSON.parse(localStorage.getItem("school") as any)
          : this.schools[0]
      );
    });
  }
  setSchool(school: School): void {
    this.school = school;
    this.schoolsService.setCurrentSchool(school);
  }
}
