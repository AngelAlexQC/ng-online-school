import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    this.authService
      .login(this.form.value.email, this.form.value.password)
      .subscribe(
        (data: any) => {
          localStorage.setItem("token", data.token);
          this.http
            .get(environment.apiURL + "user", {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .subscribe((data: any) => {
              this.authService.user = data;
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Acceso Exitoso!",
                showConfirmButton: false,
                timer: 1000,
                allowOutsideClick: false,
              });
            });
        },
        (error: any) => {
          Swal.fire(
            "Credenciales Incorrectas",
            error.error.errors.email[0],
            "error"
          );
        }
      );
    console.log("Login submitted");
  }
}
