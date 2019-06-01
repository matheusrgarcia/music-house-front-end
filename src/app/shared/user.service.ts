import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "./user";

@Injectable({ providedIn: "root" })
export class UserService {
  apiURL = "https://rede-social-web.herokuapp.com";
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(this.apiURL + "/users");
  }

  getCurrentUser() {
    return this.http.get<User[]>(this.apiURL + "/users");
  }
}
