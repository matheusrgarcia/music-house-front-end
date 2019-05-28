import { Component, OnInit, Input } from "@angular/core";
import { RestApiService } from "../../shared/rest-api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"]
})
export class UserLoginComponent implements OnInit {
  @Input() userDetails = { name: "", email: "", password: "" };
  constructor(public restApi: RestApiService, public router: Router) {}
  ngOnInit() {
    console.log("Enters here");
  }

  userLogin(dataUser) {
    this.restApi.getUser(this.userDetails).subscribe((data: {}) => {
      this.router.navigate(["users-list"]);
    });
  }
}
