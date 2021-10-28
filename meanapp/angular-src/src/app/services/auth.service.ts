import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';



@Injectable()
export class AuthService {
  authToken : any;
  user: any;


  constructor(private http:Http) { }



  //register the user
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/users/register/',user,{headers:headers}).map(res=>res.json());
  }


  //authenticate the user
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  //store the data = add them to localstorage
  storeUserData(token, user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken= token;
    this.user = user;
  }

  //logout
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  
  //get token form local storage and run it in the getProfile
  loadToken(){
    const token  = localStorage.getItem('id_token');
    this.authToken = token;
  }


  //getting a profile
  getProfile(){
    let headers = new Headers();

    //getting the token 
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/users/profile', {headers: headers})
      .map(res => res.json());
  }



  getPosts(){
    let headers = new Headers();

    //getting the token 
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/users/posts', {headers: headers})
      .map(res => res.json());
  }

  //check if logged in and token not expired
  loggedIn(){
    return tokenNotExpired("id_token");
  }
}
