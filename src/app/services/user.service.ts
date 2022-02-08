import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedInUserName = new Subject();
  userInfo = JSON.parse(localStorage.getItem('loginInfo') || '{}');
  //Injecting in-built services
  //Http client service is used to make http request
  constructor(public http: HttpClient) {}

  //Register User API Call
  register(regData: any) {
    return this.http.post(environment.userServer + 'register', regData);
  }

  //Login API Call
  login(loginData: any) {
    return this.http.post(environment.userServer + 'login', loginData);
  }

  //Logout API Call
  logout() {
    return this.http.post(environment.userServer + 'logout', '');
  }

  //Get Logged In User Via Token API Call
  getUserInfo() {
    return this.http.get(environment.userServer + 'me');
  }

  //Update User Profile API Call
  updateUserProfile(userData: any) {
    return this.http.put(environment.userServer + 'me', userData);
  }

  //Upload Image API Call
  uploadImage(formData: any) {
    return this.http.post(environment.userServer + 'me/avatar', formData);
  }

  //Get User Image API Call
  getUserImage() {
    return this.http.get(
      environment.userServer + this.userInfo._id + '/avatar',
      {
        responseType: 'blob',
      }
    );
  }

  //Delete Image API Call
  deleteImage() {
    return this.http.delete(environment.userServer + 'me/avatar');
  }

  //Delete User API Call
  deleteUser() {
    return this.http.delete(environment.userServer + 'me');
  }
}
