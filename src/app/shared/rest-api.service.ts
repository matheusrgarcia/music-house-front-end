import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "./user";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RestApiService {
  // Define API
  apiURL = "https://rede-social-web.herokuapp.com";
  //apiURL = "https://red-shrimp-86.localtunnel.me";
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  /*========================================
CRUD Methods for consuming RESTful API
=========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  // HttpClient API get() method => Fetch Users list
  getUsers(): Observable<User> {
    return this.http.get<User>(this.apiURL + "/users").pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Current User
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // Login
  login(user) {
    return this.http
      .post<User>(this.apiURL + "/auth", JSON.stringify(user))
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  // Logout
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  // HttpClient API get() method => Get user by ID
  getUser(): Observable<User> {
    const authToken = JSON.parse(localStorage.getItem("currentUser"));
    const headers = new HttpHeaders({
      "X-token": authToken["auth-jwt"]
    });
    return this.http.get<User>(this.apiURL + "/me", { headers }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getFriend(name): Observable<User> {
    const authToken = JSON.parse(localStorage.getItem("currentUser"));
    const headers = new HttpHeaders({
      "X-token": authToken["auth-jwt"]
    });
    return this.http
      .get<User>(this.apiURL + "/search/user?name=" + name, { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getUserTimeline(): Observable<User> {
    const authToken = JSON.parse(localStorage.getItem("currentUser"));
    const headers = new HttpHeaders({
      "X-token": authToken["auth-jwt"]
    });
    return this.http.get<User>(this.apiURL + "/me/timeline", { headers }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Friend Request
  friendInvite(userId) {
    const authToken = JSON.parse(localStorage.getItem("currentUser"));
    const headers = new HttpHeaders({
      "X-token": authToken["auth-jwt"]
    });
    return this.http
      .get<User>(this.apiURL + "/users/" + userId + "/invite", { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Get Friend Requests
  getFriendRequests(): Observable<User> {
    const authToken = JSON.parse(localStorage.getItem("currentUser"));
    const headers = new HttpHeaders({
      "X-token": authToken["auth-jwt"]
    });
    return this.http
      .get<User>(this.apiURL + "/me/invitations", { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Accept Friend Request
  acceptFriendRequest(invitationId): Observable<User> {
    const authToken = JSON.parse(localStorage.getItem("currentUser"));
    const headers = new HttpHeaders({
      "X-token": authToken["auth-jwt"]
    });
    return this.http
      .get<User>(this.apiURL + "/me/invitations/" + invitationId + "/accept", { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Reject Friend Request
  rejectFriendRequest(senderId): Observable<User> {
    const authToken = JSON.parse(localStorage.getItem("currentUser"));
    const headers = new HttpHeaders({
      "X-token": authToken["auth-jwt"]
    });
    return this.http
      .get<User>(this.apiURL + "/users/" + senderId + "/invite/cancel", { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // List Friends
  listFriends(): Observable<User> {
    const authToken = JSON.parse(localStorage.getItem("currentUser"));
    const headers = new HttpHeaders({
      "X-token": authToken["auth-jwt"]
    });
    return this.http
      .get<User>(this.apiURL + "/me/friends", { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  sendUserPost(post): Observable<User> {
    console.log(post);
    return this.http
      .post<User>(
        this.apiURL + "/me/posts" + post.id,
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // HttpClient API post() method => Create User
  createUser(user): Observable<User> {
    return this.http
      .post<User>(
        this.apiURL + "/users/" + user.id,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // User Token auth
  auth(user): Observable<User> {
    return this.http
      .post<User>(this.apiURL + "/auth", JSON.stringify(user), this.httpOptions)
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user["auth-jwt"]) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  // HttpClient API put() method => Update User
  updateUser(id, user): Observable<User> {
    return this.http
      .put<User>(
        this.apiURL + "/users/" + id,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // HttpClient API delete() method => Delete User
  deleteUser(id) {
    return this.http
      .delete<User>(this.apiURL + "/users/" + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
