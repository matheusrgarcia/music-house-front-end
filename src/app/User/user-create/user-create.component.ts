import { Component, OnInit, Input } from "@angular/core";
import { RestApiService } from "../../shared/rest-api.service";
import { Router } from "@angular/router";

@Component({
  selector: "user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"]
})
export class UserCreateComponent implements OnInit {
  @Input() userDetails = {
    name: "",
    email: "",
    password: "",
    foundationDate: "",
    phone: "",
    style: ""
  };
  constructor(public restApi: RestApiService, public router: Router) {}
  ngOnInit() {
    console.log("Enters here");
  }
  addUser(dataUser) {
    this.restApi.createUser(this.userDetails).subscribe((data: {}) => {
      this.router.navigate(["/users-list"]);
    });
  }
}
