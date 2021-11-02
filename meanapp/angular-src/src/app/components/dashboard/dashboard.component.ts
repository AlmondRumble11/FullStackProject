import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {
  posts=[]/*: Post={
  };*/
  postCount = 5;
  maxPostCount = 0;
  searchText: Text;
  constructor(private authService: AuthService, private router:Router,private flashMessage: FlashMessagesService) { }
  
  ngOnInit() {
    this.authService.getPosts().subscribe(data=>{
      console.log(data);
      this.maxPostCount = data.length;
      console.log(data.length);
      this.posts = data.slice(0,this.postCount); 
      console.log(this.posts);
    }, err =>{
        console.log(err);
        return false;
      });

      

  }
  onSearchPressed(){
    const input = document.getElementById("search");
    console.log("1111111111111111111111111");
    console.log(this.searchText);

    //get all posts that contain search title
    this.authService.searchPosts(this.searchText).subscribe(data=>{
      console.log(data);
      this.posts = data;
      console.log(data.length)
      this.postCount = data.length;
    })
  }

  onMorePostPressed(){
    
    
    if(this.maxPostCount > this.postCount){
      this.postCount += 5;
    console.log("showing more posts");
    this.authService.getPosts().subscribe(data=>{
      console.log(data);
      this.posts = data.slice(0,this.postCount); 
      console.log(this.posts);
    }, err =>{
        console.log(err);
        return false;
      });
    }else{
      const btn = document.getElementById("morePosts");
      btn.setAttribute('disabled', 'true');
      this.flashMessage.show("No more posts to be shown", {cssClass: 'alert-success', timeout: 5500});
    }
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
