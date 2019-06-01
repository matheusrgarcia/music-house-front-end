import { Component, OnInit, Input } from "@angular/core";
import { RestApiService } from "../../shared/rest-api.service";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

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

  model: any = {
    name: "",
    email: "",
    password: "",
    foundationDate: "",
    phone: "",
    style: ""
  };

  form: FormGroup;

  constructor(
    public restApi: RestApiService,
    public router: Router,
    private fbuilder: FormBuilder
  ) {
    this.form = this.fbuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      style: [""],
      phone: [""]
    });
  }
  ngOnInit() {
    console.log("User Register Component");
  }

  createUser() {
    this.restApi.createUser(this.userDetails).subscribe((data: {}) => {
      this.router.navigate(["/user-login"]);
    });
  }
}
