import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private apiUrl = environment.apiURL + "users";
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<any>(this.apiUrl);
  }
  searchUsers(search: string) {
    return this.http.get<any>(`${this.apiUrl}?search=${search}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }
}
