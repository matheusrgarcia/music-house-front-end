import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../shared/rest-api.service";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"]
})
export class UserCreateComponent implements OnInit {
  userDetails = {
    name: "",
    email: "",
    password: "",
    profile_img_url: "",
    description: ""
  };

  constructor(
    public restApi: RestApiService,
    public router: Router,
    private fbuilder: FormBuilder
  ) {}

  form: FormGroup = this.fbuilder.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    password: ["", Validators.required],
    profile_img_url: [""],
    description: [""]
  });

  ngOnInit() {}

  createUser() {
    this.restApi.createUser(this.userDetails).subscribe((data: {}) => {
      this.router.navigate(["/user-login"]);
    });
  }
}
