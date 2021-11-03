import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;


  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {

    //get the current user sata
    this.authService.getProfile().subscribe(data =>{
      this.user = data.user;
    }, err =>{
      console.log(err);
      return false;
    });

  }


  //go to all user posts page
  onShowAllPostsPressed(){

    return this.router.navigate(['/userposts'], this.user);
 

  }

}
