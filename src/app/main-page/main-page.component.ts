import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../shared/rest-api.service";
import { User } from "../shared/user";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  user: User;

  constructor(
    public restApi: RestApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /* ngOnInit() {
    this.router.routerState.root.queryParams.subscribe(params => {
      console.log("Parametros no Main: ", params);
      console.log("Parametros no Main: ", params.lazyUpdate);
      this.getUser(params);
      console.log("User: ", this.user);
    });
  }
  */

  ngOnInit() {
    console.log(this.GetHttpHeaders());
  }

  async GetHttpHeaders() {
    await this.router.routerState.root.queryParams.subscribe(params => {
      console.log("params: ", params);
      return params;
    });
  }

  getUser() {
    return this.restApi.getUser({ headers: this.GetHttpHeaders() });
  }
}
