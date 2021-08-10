import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user!: User;
  token: string;
  constructor(private _http: HttpClient, private router: Router) {
    localStorage.setItem(
      "token",
      localStorage.getItem("token") || JSON.stringify(null)
    );
    this.token = localStorage.getItem("token") || "null";
    this.setToken(this.token);
    _http
      .get(environment.apiURL + "user", {
        headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
      })
      .subscribe(
        (data: any) => {
          this.user = data;
        },
        (error) => {
          switch (error.status) {
            case 401:
              this.router.navigate(["/home"]);
              console.log("Unauthorized, Login to Access");
              break;
            default:
              break;
          }
        }
      );
  }

  login(email: any, password: any) {
    let headers = new HttpHeaders();
    headers = headers.set("Accept", "application/json");
    headers = headers.set("Content-Type", "application/json");
    return this._http.post(
      environment.apiURL + "login",
      { email, password },
      {
        headers,
      }
    );
  }

  logout() {
    this.token = "null";
    localStorage.setItem("token", this.token);
  }
  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }
}
