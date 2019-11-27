import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  submitMessage:string;
  username:FormControl;
  password:FormControl;
  constructor(private authservice:AuthenticationService, private routerservice:RouterService){}
  loginform=new FormGroup({
    username :new FormControl('', Validators.required),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
  })
    ngOnInit()
    {
    }
    loginSubmit() {
      console.log(this.loginform.value);
      this.authservice.authenticateUser(this.loginform.value).subscribe(data=>{
        console.log(data);
        this.authservice.setBearerToken(data['token']);
        this.routerservice.routeToDashboard();
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
