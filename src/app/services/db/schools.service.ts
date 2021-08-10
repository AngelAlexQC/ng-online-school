import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Paginated } from "src/app/models/paginated";
import { School } from "src/app/models/school";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SchoolsService {
  private apiUrl = environment.apiURL + "schools";
  schools!: Paginated;
  school!: School;

  constructor(private http: HttpClient) {}

  getAllSchools() {
    return this.http.get<any>(this.apiUrl);
  }
  setSchools(schools: Paginated) {
    this.schools = schools;
  }
  getSchools() {
    return this.schools;
  }
  getCurrentSchool() {
    return this.school;
  }
  setCurrentSchool(school: School) {
    this.school = school;
    localStorage.setItem("school", JSON.stringify(school));
  }
}
