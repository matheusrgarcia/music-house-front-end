import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../shared/User";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RestApiService {
  // Define API
  apiURL = "https://rede-social-web.herokuapp.com";
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
  getUser(user): Observable<User> {
    return this.http.get<User>(this.apiURL + "/me" + user.id).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API post() method => Create User
  createUser(user): Observable<User> {
    console.log(user);
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

  // User Token
  auth(user): Observable<User> {
    return this.http
      .post<User>(this.apiURL + "/auth", JSON.stringify(user), this.httpOptions)
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
