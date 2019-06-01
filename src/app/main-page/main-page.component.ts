import { Component, OnInit, Input } from "@angular/core";
import { RestApiService } from "../shared/rest-api.service";
import { User } from "../shared/user";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  @Input() postDetails = {
    name: "",
    email: "",
    password: "",
    profile_img_url: "",
    description: ""
  };

  user: User;
  usuario: any;

  post: any;
  posts: any;

  form: FormGroup;

  constructor(
    public restApi: RestApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fbuilder: FormBuilder
  ) {
    this.form = this.fbuilder.group({
      content_text: ["", Validators.required],
      content_img: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.restApi.getUser().subscribe(user => {
      this.usuario = user;
    });
  }

  getTimeline() {
    this.restApi.getUserTimeline().subscribe(posts => {
      this.posts = posts;
      console.log(posts);
    });
  }

  userLogout() {
    console.log("Enters here?");
    if (window.confirm("Você tem certeza que fazer Logout?")) {
      this.restApi.logout();
    }
  }

  sendPost() {
    this.restApi.sendUserPost(this.postDetails).subscribe(post => {
      console.log(post);
    });
  }
}
