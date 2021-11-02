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
     // console.log(data);

   
     //get the current user  
     this.authService.getProfile().subscribe(user=>{
        console.log(user.user._id);
        console.log(data.userID);
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

  onSavePressed(){

    //get the new content and private/public
    const content = document.getElementById("content");
    const content2 = document.getElementById("content2");
    const spanText = document.getElementById("spantext");
    const privateBox = document.getElementById("private"); 
    
  
    console.log(this.content);
    console.log(this.private);

    console.log("current content:\n"+this.currentPost.content);
    if(this.private == undefined) this.private = false;

    this.currentPost.private = this.private;
    this.currentPost.content = this.content;

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

  
  onEditPressed(){
    if(this.count < 1){
      const removebtn = document.getElementById("remove-btn");
      const privateBox = document.getElementById("private");
      const privateText = document.getElementById("privateText");
      const saveBtn = document.getElementById("submit");
      const spanText = document.getElementById("spantext");
      const content = document.getElementById("content");
      const content2 = document.getElementById("content2");
      const orgDiv = document.getElementById("org-content-div");
      const newDiv = document.getElementById("newDiv");

      //create a new textarea
      /*const newTextarea = document.createElement("textarea");
      newTextarea['[(ngModel)]']='content';
      newTextarea.style.resize = 'none';
      newTextarea.setAttribute('name','content2');
      newTextarea.setAttribute("class",'form-control');
      newTextarea.setAttribute('id','content2');
      newTextarea.setAttribute('cols','50');
      newTextarea.setAttribute('rows','10');
      const text = this.currentPost.content;
      console.log("sads"+text);
      newTextarea['value']=text;

      orgDiv.appendChild(newTextarea);*/




      content['disabled'] = false;
      this.count+=1;
      //set the orginal value for the new text area that can be updated
     // content2['value'] = this.currentPost.content;
      this.currentPost.content = "";
      //remove original textarea
     //content.remove();
      removebtn.style.visibility = "visible";
      privateBox.style.visibility = "visible";
      saveBtn.style.visibility = "visible";
      privateText.style.visibility = "visible";
      spanText.style.visibility = "visible";
      }
    
  }

  onRemovePressed(){
    console.log("remove was pressed");
    console.log(this.currentPost);
    const postID = this.currentPost._id;
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
