import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private authService: AuthService,private router:Router,private flashMessage: FlashMessagesService) { }
  
  currentPost: any;
  content: String;
  content2: String;
  private: Boolean;
  count : number;

  ngOnInit() {
    this.count=0;

    //get the post that was selected
    this.authService.getPost().subscribe(data=>{
      this.currentPost = data;
      this.content = data.content;
      this.private = data.private
     // console.log(data);

   
     //get the current user  
     this.authService.getProfile().subscribe(user=>{
        //console.log(user.user._id);
        //console.log(data.userID);
        
        //get edit btn and set it visible if current user is the poster of that post
        const editbtn = document.getElementById("edit-btn");
        if(user.user._id == data.userID){
          editbtn.style.visibility = "visible";
                
        }
      }),err =>{
        console.log(err);
        return false;
      };

    }) ,err =>{
      console.log(err);
      return false;
    };
    
   
  }

  //saving post btn is pressed
  onSavePressed(){

    //get the new content and private/public

    
  
    //console.log(this.content);
    console.log(this.private);

    //console.log("current content:\n"+this.currentPost.content);
    
    //private is false
    if(this.private == undefined) this.private = false;

    this.currentPost.private = this.private;
    this.currentPost.content = this.content;


    //modify the post
  this.authService.modifyPost(this.currentPost).subscribe(data=>{
      if(data.success){

        this.flashMessage.show("Post was modified", {cssClass: 'alert-success', timeout: 5500});
        this.router.navigate(['dashboard']);
        
        }else{
        this.flashMessage.show("Something went wrong. Could not modify the post. Please try again", {cssClass: 'alert-danger', timeout: 5500});
        
      }
    });
    console.log("save pressed");
    
    //this.currentPost.content = updateContent;

  
    
    

  }

  //set editing options visible
  onEditPressed(){
    if(this.count < 1){
      const removebtn = document.getElementById("remove-btn");
      const editbtn = document.getElementById("edit-btn");
      const privateBox = document.getElementById("private");
      const privateText = document.getElementById("privateText");
      const saveBtn = document.getElementById("submit");
      const spanText = document.getElementById("spantext");
      const content = document.getElementById("content");
      editbtn.style.visibility = 'hidden';
      content['disabled'] = false;
      this.count+=1;
      this.currentPost.content = "";
      removebtn.style.visibility = "visible";
      privateBox.style.visibility = "visible";
      saveBtn.style.visibility = "visible";
      privateText.style.visibility = "visible";
      spanText.style.visibility = "visible";
      }
    
  }

  //remove was pressed
  onRemovePressed(){
    //console.log("remove was pressed");
   // console.log(this.currentPost);
   //delete the post
    this.authService.deletePost(this.currentPost).subscribe(data=>{
      if(data.success){
      this.flashMessage.show("Post removed", {cssClass: 'alert-success', timeout: 5500});
      this.router.navigate(['dashboard']);
      }else{
      this.flashMessage.show("Something went wrong. Could not delete the post. Please try again", {cssClass: 'alert-danger', timeout: 5500});
    }
    });
  }

}
