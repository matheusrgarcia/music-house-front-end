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
  requests: any;

  userId;

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
    this.restApi.getFriendRequests().subscribe(friendRequests => {
      this.requests = friendRequests;
    });
  }

  // Accept Friendship
  acceptFriendship(invitation_id){
    this.restApi.acceptFriendRequest(invitation_id).subscribe(() =>{
      alert("Você aceitou o convite deste amigo :)");
      location.reload();
    });
  }

  //Deny Friendship
  denyFriendship(sender_id){
    this.restApi.rejectFriendRequest(sender_id).subscribe(() =>{
      alert("Você Negou o convite deste amigo :(");
      location.reload();
    });
  }

  inviteFriend(userId) {
    this.restApi.friendInvite(userId).subscribe(answer => {
      if(!answer){
        alert("Pedido de Amizade enviado!");
      } else {
        alert("Você já tem um pedido de Amizade Pendente!");
      }
    });
  }
}
