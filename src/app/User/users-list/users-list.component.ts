import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../shared/rest-api.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"]
})
export class UsersListComponent implements OnInit {
  userNames: any;
  usuario: any;
  Users: any;

  constructor(
    public restApi: RestApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadSearchedList();
    this.restApi.getUser().subscribe(user => {
      this.usuario = user;
    });
  }

  // Logout
  userLogout() {
    if (window.confirm("Você tem certeza que fazer Logout?")) {
      this.restApi.logout();
      this.router.navigate(["../user-login"]);
    }
  }

  // Get Searched list
  loadSearchedList() {
    this.route.queryParams.subscribe(params => {
      this.userNames = params["name"];
    });

    this.restApi.getFriend(this.userNames).subscribe(results => {
      this.Users = results;
    });
  }
}
