import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";

// Components
import { UserCreateComponent } from "./user/user-create/user-create.component";
import { UserDetailsComponent } from "./user/user-details/user-details.component";
import { UserUpdateComponent } from "./user/user-update/user-update.component";
import { UsersListComponent } from "./user/users-list/users-list.component";

// HttpClient module for RESTful API
import { HttpClientModule } from "@angular/common/http";

// Forms Module
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "create-user" },
  { path: "create-user", component: UserCreateComponent },
  { path: "user-details", component: UserDetailsComponent },
  { path: "update-user", component: UserUpdateComponent },
  { path: "users-list", component: UsersListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserUpdateComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
