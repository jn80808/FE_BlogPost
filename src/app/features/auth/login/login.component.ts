import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

model: LoginRequest;

  constructor(private authservice: AuthService,
    private cookiesService: CookieService,
    private router : Router
  ){
        this.model = {
          email: '',
          password:''
        };
      }


  onFormSubmit(): void {
    this.authservice.login(this.model)
    .subscribe({
      next:(response)=>{
        //console.log(response);
        
        //Set Auth Cookie 
        this.cookiesService.set('Authorization', `Bearer ${response.token}`,
          undefined,'/',undefined,true,'Strict');


        // Redirect back to Home 
        this.router.navigateByUrl('/');



      }
    })
  }
    
}