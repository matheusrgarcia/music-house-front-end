import { Component, OnInit, Input } from "@angular/core";
import { RestApiService } from "../../shared/rest-api.service";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"]
})
export class UserLoginComponent implements OnInit {
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

  ngOnInit() {}

  userLogin() {
    this.restApi.auth(this.userDetails).subscribe(dados => {
      let headers = new HttpHeaders().append("X-token", JSON.stringify(dados));

      headers = headers.set("Content-Type", "application/json; charset=utf-8");

      console.log("Dados:", dados, "Headers: ", headers);

      this.router.navigate(["main-page"], { queryParams: headers });
    });
  }
}
