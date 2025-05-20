import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

model: LoginRequest;

  constructor(private authservice: AuthService){
        this.model = {
          email: '',
          password:''
        };
      }


  onFormSubmit(): void {
    this.authservice.login(this.model)
    .subscribe({
      next:(response)=>{
        console.log(response);
      }
    })
  }
    
}