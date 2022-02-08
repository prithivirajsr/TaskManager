import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnDestroy {
  registersubscriber = new Subscription(); //subscriberr for api call

  //Injecting in-built & 3rd party services
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService,
    public userService: UserService
  ) {}

  //default value for regsitration form
  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]],
    age: ['', [Validators.required, Validators.min(1)]],
  });

  /*This function at first calls registration api in user service,
    Its response the user details stored in localstorage,
    and its token stored in cookie, finally navigates to login page */
  userRegistration(registrationData: FormGroup) {
    this.registersubscriber = this.userService
      .register(registrationData.value)
      .subscribe(
        (response: any) => {
          localStorage.setItem(
            'registrationInfo',
            JSON.stringify(response.user)
          );
          this.cookieService.set('registrationToken', response.token);
          this.toastr.success('Registration Successfull');
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          this.toastr.error('User already exists, try with different email');
        }
      );
  }

  ngOnDestroy(): void {
    this.registersubscriber.unsubscribe();
    //unsubscribing the created subscription
  }
}
