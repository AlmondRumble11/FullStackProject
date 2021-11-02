import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-userposts',
  templateUrl: './userposts.component.html',
  styleUrls: ['./userposts.component.css']
})
export class UserpostsComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }
  user: any;
  posts = [];
  

  ngOnInit() {
    //get current user
    this.authService.getProfile().subscribe(data=>{
      this.user = data.user;
      console.log(this.user.username);
      this.authService.getAllUserPosts(this.user._id).subscribe(data=>{
        console.log(data[0]);
        this.posts = data[0];

      }, err =>{
        console.log(err);
        return false;
      });
    }
    , err =>{
      console.log(err);
      return false;
    });
    console.log(this.user);
    

  }
  onSelect(post){
    this.authService.storeCurrentPost(post);
    //this.authService.getPost(post)
    console.log("post id = "+post._id);
    let url = 'post/'+post._id;
    return this.router.navigate(['/post']);
    console.log("ksfd");
  }
}
