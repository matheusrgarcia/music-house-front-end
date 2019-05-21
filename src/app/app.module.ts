import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import { UsersListComponent } from './user/users-list/users-list.component';

const routes: Routes = [
  {path: "", pathMatch:'full', redirectTo:'create-user'},
  {path: "create-user", component:UserCreateComponent},
  {path: "user-details", component:UserDetailsComponent},
  {path: "update-user", component: UserUpdateComponent},
  {path: "users-list", component: UsersListComponent}
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
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
