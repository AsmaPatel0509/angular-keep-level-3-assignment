import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username = new FormControl();
  password = new FormControl();
  submitMessage: string;
  constructor(private authService: AuthenticationService, private routerService: RouterService) { }
  ngOnInit() {
     this.username = new FormControl('', [Validators.required]),
      this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
      this.loginForm = new FormGroup ({
          username: this.username,
          password: this.password
      });
  }
  loginSubmit() {
    console.log(this.loginForm.value);
    // console.log("Inside SignIN");
    this.authService.authenticateUser(this.loginForm.value).subscribe(
      data => {
    console.log(data);
     this.authService.setBearerToken(data['token']);
     this.routerService.routeToDashboard();
    },
    error => {
      if (error.status === 404) {
        this.submitMessage = 'Http failure response for http://localhost:3000/auth/v1: 404 Not Found'; }
     if (error.status === 403) {
        this.submitMessage = 'Unauthorized';
     }
    });
   }
}