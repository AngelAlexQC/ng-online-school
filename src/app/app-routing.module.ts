import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactPageComponent } from "./pages/contact-page/contact-page.component";
import { CourseComponent } from "./pages/course/course.component";
import { HomePageComponent } from "./pages/shared/home-page/home-page.component";
import { IndexPageComponent } from "./pages/shared/index-page/index-page.component";
import { SettingsComponent } from "./pages/settings/settings.component";
import { LoginComponent } from "./pages/shared/login/login.component";
import { NotFoundComponent } from "./pages/shared/not-found/not-found.component";
import { UnauthorizedComponent } from "./pages/shared/unauthorized/unauthorized.component";
import { ProfileComponent } from "./pages/shared/profile/profile.component";

const routes: Routes = [
  {
    path: "",
    component: IndexPageComponent,
  },
  {
    path: "home",
    component: HomePageComponent,
  },
  {
    path: "contact",
    component: ContactPageComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: "course/:id",
    component: CourseComponent,
  },
  {
    path: "401",
    component: UnauthorizedComponent,
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
  {
    path: "404",
    component: NotFoundComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
