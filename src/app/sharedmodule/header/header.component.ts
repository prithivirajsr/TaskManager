import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  getLoggedInUserName: Subscription = new Subscription();
  userName: string = '';
  imageFile: any = '../../../assets/images/avatar.png'; //default image source path
  newImageFile: Blob = new Blob(); //blob for image
  //Subscribers for api calls
  logoutsubscriber = new Subscription();
  userProfilesubscriber = new Subscription();
  updateUsersubscriber = new Subscription();
  uploadImagesubscriber = new Subscription();
  getUserImagesubscriber = new Subscription();
  deleteUsersubscriber = new Subscription();
  deleteImagesubscriber = new Subscription();

  //Injecting in-built & 3rd party services
  constructor(
    public userService: UserService,
    public router: Router,
    public toastr: ToastrService,
    public cookieService: CookieService,
    public formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  //default form values for profile updation form
  updateForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern]],
    email: ['', [Validators.required, Validators.email]],
    age: ['', [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): any {
    const userDetails = JSON.parse(localStorage.getItem('loginInfo') || '{}');
    if (userDetails && userDetails.name) {
      this.userName = userDetails.name;
    }
    this.getLoggedInUserName = this.userService.loggedInUserName.subscribe(
      (data: any) => {
        this.userName = data;
      }
    );
    this.getUserImage();
  }

  /*  This function at first calls api in user service,
  if the response is success,
  then assigning received values from server to form Values, */
  userProfile() {
    this.getUserImage();
    this.userProfilesubscriber = this.userService.getUserInfo().subscribe(
      (response: any) => {
        this.updateForm = this.formBuilder.group({
          name: [response.name, [Validators.required, Validators.pattern]],
          email: [response.email, [Validators.required, Validators.email]],
          age: [response.age, [Validators.required, Validators.min(1)]],
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //This function is for reading image from an event and setting image as url
  onImageAdded(fileEvent: any) {
    fileEvent.preventDefault();
    const reader = new FileReader();
    this.newImageFile = fileEvent.target.files[0];
    reader.readAsDataURL(this.newImageFile);
    reader.onload = () => {
      this.imageFile = reader.result;
    };
  }

  //This function is for uploading image to server
  uploadImage() {
    const formData = new FormData();
    formData.append('avatar', this.newImageFile);
    this.uploadImagesubscriber = this.userService
      .uploadImage(formData)
      .subscribe(
        (response: any) => {
          if (response.succes) {
            this.toastr.success('ProfileImage Successfully Updated');
            this.getUserImage();
          }
        },
        (error) => {
          this.toastr.error(error.error.error);
        }
      );
  }

  //This function is for getting userimage from server
  getUserImage() {
    this.getUserImagesubscriber = this.userService.getUserImage().subscribe(
      (response: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onload = () => {
          this.imageFile = reader.result;
        };
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //This function is for deleting profile picture
  deleteImage() {
    this.deleteImagesubscriber = this.userService.deleteImage().subscribe(
      (response: any) => {
        if (response.success) {
          this.toastr.success('ProfileImage Successfully Deleted');
          this.imageFile = '../../../assets/images/avatar.png';
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //This function is for updating user info
  updateUser(userDetail: FormGroup) {
    this.updateUsersubscriber = this.userService
      .updateUserProfile(userDetail.value)
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.toastr.success('Profile Updated Successfully');
            this.userName = response.data.name;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //This is for deleting the user
  onDeleteUser() {
    this.deleteUsersubscriber = this.userService.deleteUser().subscribe(
      (response) => {
        this.cookieService.deleteAll();
        localStorage.clear();
        this.toastr.success('Account Deleted Successfully');
        this.userName = '';
        this.router.navigate(['/start']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //This function is for logout purpose
  onLogout() {
    this.logoutsubscriber = this.userService.logout().subscribe(
      (response: any) => {
        if (response.success) {
          this.cookieService.deleteAll();
          localStorage.clear();
          this.userName = '';
          this.router.navigate(['/start']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.getLoggedInUserName.unsubscribe();
    this.userProfilesubscriber.unsubscribe();
    this.uploadImagesubscriber.unsubscribe();
    this.updateUsersubscriber.unsubscribe();
    this.deleteUsersubscriber.unsubscribe();
    this.logoutsubscriber.unsubscribe();
    this.getUserImagesubscriber.unsubscribe();
    //unsubscribing the created subscription
  }
}
