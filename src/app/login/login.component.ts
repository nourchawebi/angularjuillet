import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationRequest} from "../models/AuthenticationRequest";
import {AuthenticationRespons} from "../models/authentication-response";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
authForm:FormGroup;
authRequest:AuthenticationRequest={};
authResponse: AuthenticationRespons={}
  constructor(private authService:AuthService,private router:Router,
private formBuilder:FormBuilder) {
    this.authForm=this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',Validators.required]
    })
  }
  error:string="";
  message:any='';
  authenticate(){
    this.authRequest.username=this.authForm.get('username')?.value;
    this.authRequest.password=this.authForm.get('password')?.value;
    this.authService.login(this.authRequest).subscribe({
      next:(response)=>{
        this.authResponse=response;
        localStorage.setItem('token', response.accessToken as string);
        this.error="";
        const tokenPayload=this.authService.decodedToken();
        this.message="u will be redirected to welcome page";
        const role= "USER";
        if(role=="USER"){
          this.router.navigate((['acceuil']))
        }
        else {this.router.navigate(['admin'])}
      },
      error:(error)=>{
        if(error.status===404){
          this.error=error.error;
        }else{
          if(error.status===403){
            if(error.error==='User disabled and token expired'){
              this.error="User disabled and token expired";
              this.message="";
            }else if (error.error==='User disabled'){
              this.error='user disabled';
              this.message="";
            }

          }else{
            this.error='Bad credentials'
          }
        }
      }
    })
  }
}
