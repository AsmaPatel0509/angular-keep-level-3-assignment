import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, Form } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitMessage: string;
  username:FormControl;
  password:FormControl;

  constructor(private authService: AuthenticationService, private routerService: RouterService) { }

  ngOnInit() {

  }
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])

  })

  // get username() {
  //   return this.loginForm.get('username');
  // }

  // get password() {
  //   return this.loginForm.get('password');
  // }

  loginSubmit() {
    console.log(this.loginForm.value);
    this.authService.authenticateUser(this.loginForm.value).subscribe(data => {
      console.log("Data: ", data);
      this.authService.setBearerToken(data['token']);
      this.routerService.routeToDashboard();
    },
      error => {
        if (error.status === 404) {
          this.submitMessage = 'Http failure response for http://localhost:3000/auth/v1: 404 Not Found';
        }
        if (error.status === 403) {
          this.submitMessage = 'Unauthorized';
        }
      });
  }

}
