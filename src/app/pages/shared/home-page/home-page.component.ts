import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}
}
