# FullStackProject

LINK TO FULL STACK COURSE DIARY: https://drive.google.com/file/d/18pT7wnpFAVaKZdjbV_cVbLGeCyZN0Hj3/view?usp=sharing

Course project for FullStack course
To run the project go to this url:
https://immense-hamlet-98311.herokuapp.com/

it should load the web application.

Home
The first page is an info page that tells what functions the application has
but the basic idea of the app is to be a platform where users can create posts that can
be public or private and other people can see the public posts and user can only see the private posts.
Also user can edit or remove alrady created posts,

And as this project uses the MEAN app tutorial as a base there is a login and register feature.

To run the project you can register a new account or user the test account below
username: newUser
password: newUser



Login
user can login using username and password
the password is crypted on the database
if username or the password is incorrect flashmessage is shown

Register
here user can register to application
all forms must be filled and email must be in a correct email from
example: email@email.com


Dashboard
On the dashboard page users can see all posts posted by other users and themselves that have been made to be public.
There is a search function which lets the users to search posts by their title and works as the following:
  NOTE: only by pressing the search button search function will work
  - if no search term, all public posts are shown
  - if search term can be found from the title of the post, all of the posts that have this search term are shown
  - if no post contain the search term, no posts are shown
  
 if user wants to see what a post contains they can press the post and they are redirected to post page which works differently if the user is the writer of the post
  - if user not the writer of the posts, then user can only see the contents, title and the writer of the post
  - if user is the writer of the post, then they can edit the post
      - post can be removed 
      - privacy of the post can be edited
      - contents of the post can be edited
      
Profile
here user information is shown and from here user can go to see all of the posts that the have created by pressing a button
All own posts page is where all user posts are shown and by pressing on a post user is dericted to the same page as if the user presses a post in the dashboard page

Add post
here user can add a post
they can give a post a title, content and make it private/public.

Logout
pressing this logs out the user

here is video that shows how to run the web page: https://drive.google.com/file/d/17tj0U0-yNdWkr7CJqQz2bUWtpZKUjqnP/view?usp=sharing
NOTE: authentication guard is not shown in the video but it has been implemented to dashboard, profile, addpost and userpost pages.


Other course work
Node.js Heroku app: https://murmuring-island-07810.herokuapp.com/

MeanApp tutorial Heroku app: https://shielded-thicket-55713.herokuapp.com/ 

Course Project Heroku App: https://immense-hamlet-98311.herokuapp.com/ 

Link to project video: https://drive.google.com/file/d/17tj0U0-yNdWkr7CJqQz2bUWtpZKUjqnP/view?usp=sharing

Express task repository: https://github.com/AlmondRumble11/Express

Node.js task repository: https://github.com/AlmondRumble11/FullStack

Angular task repository: https://github.com/AlmondRumble11/heroes

Mean app repository:https://github.com/AlmondRumble11/MeanApp

Mongo picture repository: https://github.com/AlmondRumble11/FullStackCourse



