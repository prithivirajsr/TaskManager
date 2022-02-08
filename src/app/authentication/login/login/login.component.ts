import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  email = ''; //default values for form email input
  password = ''; //default values for form password input
  loginsubscriber = new Subscription(); //subscriberr for api call

  //Injecting in-built & 3rd party services
  constructor(
    public router: Router,
    private toastr: ToastrService,
    public userService: UserService,
    private cookieService: CookieService
  ) {}

  /* This function at first calls Login api in userservice,
     its response the user data is stored in localstorage,
     and its token is stored in cookie, finally navigates to task page*/
  userLogin(loginData: NgForm) {
    this.loginsubscriber = this.userService.login(loginData.value).subscribe(
      (response: any) => {
        localStorage.setItem('loginInfo', JSON.stringify(response.user));
        this.userService.loggedInUserName.next(response.user.name);
        this.cookieService.set('loginToken', response.token);
        this.toastr.success('Login Successfull');
        this.router.navigate(['/task']);
      },
      (error) => {
        this.toastr.error(
          'Invalid credentials, provide correct email or password'
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.loginsubscriber.unsubscribe();
    //unsubscribing the created subscription
  }
}
