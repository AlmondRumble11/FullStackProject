import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
  //validaiton for the user
  validateRegister(user){
    
    //check the firlds
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined ){
      return false;
    }else{
      return true;
    }
  }
  //validation for the email
  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
