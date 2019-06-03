import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";

// Components
import { UserCreateComponent } from "./User/user-create/user-create.component";
import { UserDetailsComponent } from "./User/user-details/user-details.component";
import { UserUpdateComponent } from "./User/user-update/user-update.component";
import { UsersListComponent } from "./User/users-list/users-list.component";
import { UserLoginComponent } from "./User/user-login/user-login.component";

// HttpClient module for RESTful API
import { HttpClientModule } from "@angular/common/http";

// Forms Module
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MainPageComponent } from "./main-page/main-page.component";
import { FriendsComponent } from './friends/friends.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "user-login" },
  { path: "user-login", component: UserLoginComponent },
  { path: "user-login/create-user", component: UserCreateComponent },
  { path: "user-details", component: UserDetailsComponent },
  { path: "update-user", component: UserUpdateComponent },
  { path: "users-list", component: UsersListComponent },
  { path: "main-page", component: MainPageComponent },
  { path: "friends", component: FriendsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserUpdateComponent,
    UsersListComponent,
    UserLoginComponent,
    MainPageComponent,
    FriendsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule,
    UserCreateComponent,
    UserDetailsComponent,
    UserUpdateComponent,
    UsersListComponent,
    UserLoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
