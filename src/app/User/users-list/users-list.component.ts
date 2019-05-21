import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../../shared/rest-api.service";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"]
})
export class UsersListComponent implements OnInit {
  User: any = [];
  constructor(public restApi: RestApiService) {}
  ngOnInit() {
    this.loadUsers();
  }
  // Get employees list
  loadUsers() {
    return this.restApi.getUsers().subscribe((data: {}) => {
      this.User = data;
    });
  }
  // Delete employee
  deleteUser(id) {
    if (window.confirm("Você tem certeza que deseja deletar este usuário?")) {
      this.restApi.deleteUser(id).subscribe(data => {
        this.loadUsers();
      });
    }
  }
}
