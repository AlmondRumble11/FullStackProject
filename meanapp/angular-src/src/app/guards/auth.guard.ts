import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{


    constructor(private authService: AuthService, private router:Router){}


    canActivate(){
        //if logged in
        if(this.authService.loggedIn()){
            return true;

        }else{
            //redirect to login
            this.router.navigate(['/login']);
        }

        return false;
    }
}