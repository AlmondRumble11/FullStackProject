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
  posts=[]
  allPosts=[];
  postCount = 5;
  maxPostCount = 0;
  searchText: String;
  constructor(private authService: AuthService, private router:Router,private flashMessage: FlashMessagesService) { }
  
  ngOnInit() {

    //get all of the posts from db
    this.authService.getPosts().subscribe(data=>{
      //console.log(data);
      
      //max count is the number of public posts in db
      this.maxPostCount = data.length;
      //console.log(data.length);
      this.allPosts = data;
      //get only the 5 first posts
      this.posts = data.slice(0,this.postCount); 
      this.postCount = this.posts.length;
      
      //console.log(this.posts);
    }, err =>{
        console.log(err);
        return false;
      });

      

  }

  //when search btn is pressed
  onSearchPressed(){
   
    //console.log(this.searchText);

    //if does not have text
    if(this.searchText == undefined || this.searchText ==""){

      //get all posts
      this.authService.getPosts().subscribe(data=>{
       // console.log(data);
      
          //max count is the number of public posts in db
       this.maxPostCount = data.length;
        //console.log(data.length);

        //now has 5 posts
        this.postCount = 5;

        //get only the 5 first posts
        this.posts = data.slice(0,this.postCount); 

        console.log(this.posts);
      }, err =>{
          console.log(err);
          return false;
        });

    //had search term
    }else{
      //get all posts that contain search title
      this.authService.searchPosts(this.searchText).subscribe(data=>{
        
        //console.log(data);
        //get posts that allign with the search term
        this.posts = data;
        //console.log(data.length)
        this.postCount = data.length;
      });

      //reset search
      this.searchText = "";
  }
  }

  //more posts btn was pressed
  onMorePostPressed(){

    //check that can have more posts
    if(this.maxPostCount > this.postCount){
    
      //update post count
      
    this.postCount += 5;
    if(this.postCount > this.maxPostCount){
      this.postCount = this.maxPostCount;
    }
      //add more posts to page
      this.posts = this.allPosts.slice(0,this.postCount);
    }else{

      //does not have more posts
      const btn = document.getElementById("morePosts");
      btn.setAttribute('disabled', 'true');
      this.flashMessage.show("No more posts to be shown", {cssClass: 'alert-success', timeout: 5500});
    }
  }

  //post is pressed
  onSelect(post){

    //store the current post to local storage
    this.authService.storeCurrentPost(post);
    //this.authService.getPost(post)
    console.log("post id = "+post._id);
    let url = 'post/'+post._id;

    //navigate to post page
    return this.router.navigate(['/post']);
    
  }
  

}
