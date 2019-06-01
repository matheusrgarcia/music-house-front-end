import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../shared/rest-api.service";
import { first } from "rxjs/operators";
import { User } from "../shared/user";
import { UserService } from "../shared/user.service";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  user: User;

  constructor(
    public restApi: RestApiService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUser(this.user);
    console.log("User: ", this.user);
  }

  getUser(user) {
    this.restApi.getUser(user);
  }
}
