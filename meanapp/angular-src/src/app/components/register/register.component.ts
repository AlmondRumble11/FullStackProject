import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email:String;
  password: String;
  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService,private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  //register btn was pressed
  onRegisterSubmit(){
    //console.log("registering a new user");
    //create user
    const user={
      name: this.name,
      email: this.email,
      password: this.password,
      username: this.username
    }
    //check if all fields have somehting in them
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show("Put something into all of the fields",{cssClass: 'alert-danger', timeout:3000});
      return false;
    }
    //check that email is in correct format
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Give your email in correct format",{cssClass: 'alert-danger',timeout:3000});
      return false;
    }

    //register the user
    this.authService.registerUser(user).subscribe(data =>{
      if(data.success){
        this.flashMessage.show("You were registers. Please login",{cssClass: 'alert-success',timeout:3000});
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show("Something went wrong. Please try again",{cssClass: 'alert-danger',timeout:3000});
        this.router.navigate(['/register']);
      }
    });


  }
}
