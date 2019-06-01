import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../shared/rest-api.service";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: "app-user-update",
  templateUrl: "./user-update.component.html",
  styleUrls: ["./user-update.component.css"]
})
export class UserUpdateComponent implements OnInit {
  id = this.actRoute.snapshot.params["id"];
  userData: any = {};
  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.restApi.getUser().subscribe((data: {}) => {
      this.userData = data;
    });
  }

  // Update user data
  updateUser() {
    if (window.confirm("Você tem certeza que deseja atualizar?")) {
      this.restApi.updateUser(this.id, this.userData).subscribe(data => {
        this.router.navigate(["/users-list"]);
      });
    }
  }
}
