import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactPageComponent } from "./pages/contact-page/contact-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { IndexPageComponent } from "./pages/index-page/index-page.component";

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
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
