import { Component, OnInit, Input } from "@angular/core";
import { RestApiService } from "../shared/rest-api.service";
import { User } from "../shared/user";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  @Input() postDetails = {
    img: "",
    text: ""
  };

  user: User;
  usuario: any;

  post: any;
  posts: any;

  form: FormGroup;

  requests: any;
  amigos: any;

  constructor(
    public restApi: RestApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fbuilder: FormBuilder
  ) {
    this.form = this.fbuilder.group({
      text: ["", Validators.required],
      img: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.restApi.getUser().subscribe(user => {
      this.usuario = user;
    });
    this.restApi.getFriendRequests().subscribe(friendRequests => {
      this.requests = friendRequests;
      console.log(this.requests);
    });
  }

  // --------------------- FRIENDS METHODS ------------------------------

  // Accept Friendship
  acceptFriendship(invitation_id) {
    this.restApi.acceptFriendRequest(invitation_id).subscribe(() => {
      alert("Você aceitou o convite deste amigo :)");
      location.reload();
    });
  }

  //Deny Friendship
  denyFriendship(invitation_id) {
    this.restApi.rejectFriendRequest(invitation_id).subscribe(() => {
      alert("Você Negou o convite deste amigo :(");
      location.reload();
    });
  }

  // Logout
  userLogout() {
    if (window.confirm("Você tem certeza que fazer Logout?")) {
      this.restApi.logout();
      this.router.navigate(["../user-login"]);
    }
  }

  getTimeline() {
    this.restApi.getUserTimeline().subscribe(posts => {
      this.posts = posts;
      console.log(posts);
    });
  }

  // Send Post
  sendPost() {
    this.restApi.sendUserPost(this.postDetails).subscribe(post => {
      console.log(post);
    });
  }

  name: string;
  searched: any;

  onSearch() {
    let name = this.name;
    this.searched = this.restApi.getFriend(name).subscribe(results => {
      this.router.navigate(["../users-list"], { queryParams: { name: name } });
    });
  }
}
