import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EnrollmentsService {
  private apiUrl = environment.apiURL + "enrollments";
  constructor(private http: HttpClient) {}

  getAllEnrollments() {
    return this.http.get<any>(this.apiUrl);
  }
}
