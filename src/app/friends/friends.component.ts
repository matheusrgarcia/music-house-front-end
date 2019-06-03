import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  amigos: any;
  usuario: any;
  requests: any;
  name: any;
  searched: any;  
  constructor(public restApi: RestApiService, private router: Router) { }

  ngOnInit() {
    this.restApi.getUser().subscribe(user => {
      this.usuario = user;
    });
    this.restApi.listFriends().subscribe((friends) => {
      this.amigos = friends;
      console.log(this.amigos);
    })
  }

  // Logout
  userLogout() {
    if (window.confirm("Você tem certeza que fazer Logout?")) {
      this.restApi.logout();
      this.router.navigate(["../user-login"]);
    }
  }

  endFriendship(friendId) {
    this.restApi.cancelFriendship(friendId).subscribe((result) => {
      console.log("Friend ID: ", friendId, "Results: ", result);
      alert("Você cancelou sua amizade :(");
      location.reload();
    });
  }

  onSearch() {
    let name = this.name;
    this.searched = this.restApi.getFriend(name).subscribe(results => {
      this.router.navigate(["../users-list"], { queryParams: { name: name } });
    });
  }

}
