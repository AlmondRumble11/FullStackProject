import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private authService: AuthService,) { }

  currentPost: Object;

  ngOnInit() {
   

    //get the post that was selected
    this.authService.getPost().subscribe(data=>{
      this.currentPost = data;
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

  onEditPressed(){
    const removebtn = document.getElementById("remove-btn");
    const privateBox = document.getElementById("private");
    const privateText = document.getElementById("privateText");
    const content = document.getElementById("content");

  
    removebtn.style.visibility = "visible";
    privateBox.style.visibility = "visible";
  
    privateText.style.visibility = "visible";
    
    
  }

  onRemovePressed(){

  }

}
