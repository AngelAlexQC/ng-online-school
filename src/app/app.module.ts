import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/layout/navbar/navbar.component";
import { HomePageComponent } from "./pages/shared/home-page/home-page.component";
import { IndexPageComponent } from "./pages/shared/index-page/index-page.component";
import { ContactPageComponent } from "./pages/contact-page/contact-page.component";
import { SidebarComponent } from "./components/layout/sidebar/sidebar.component";
import { CourseComponent } from "./pages/course/course.component";
import { NotFoundComponent } from "./pages/shared/not-found/not-found.component";
import { UnauthorizedComponent } from "./pages/shared/unauthorized/unauthorized.component";
import { LoginComponent } from "./pages/shared/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfileComponent } from './pages/shared/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    IndexPageComponent,
    ContactPageComponent,
    SidebarComponent,
    CourseComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    LoginComponent,
    SettingsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
