webpackJsonp([1,4],{

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidateService = /** @class */ (function () {
    function ValidateService() {
    }
    //validaiton for the user
    ValidateService.prototype.validateRegister = function (user) {
        //check the firlds
        if (user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    //validation for the email
    ValidateService.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ValidateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], ValidateService);
    return ValidateService;
}());

//# sourceMappingURL=../../src/app/services/validate.service.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(713);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
    }
    //add post
    AuthService.prototype.addPost = function (postcontent) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        console.log("adding post to db");
        return this.http.post('users/addpost', postcontent, { headers: headers }).map(function (res) { return res.json(); });
    };
    //register the user
    AuthService.prototype.registerUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/register/', user, { headers: headers }).map(function (res) { return res.json(); });
    };
    //update user to add a new post for them
    AuthService.prototype.updateUserPost = function (userID, postTitle) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        var data = {
            userID: userID,
            postTitle: postTitle
        };
        console.log("in update user post", data);
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/update/user', data, { headers: headers }).map(function (res) { return res.json(); });
    };
    //modify a post
    AuthService.prototype.modifyPost = function (post) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/update/post', post, { headers: headers }).map(function (res) { return res.json(); });
    };
    //remove post
    AuthService.prototype.deletePost = function (post) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/remove/post', post, { headers: headers }).map(function (res) { return res.json(); });
    };
    //authenticate the user
    AuthService.prototype.authenticateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('users/authenticate', user, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //store the data = add them to localstorage
    AuthService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    //store current post
    AuthService.prototype.storeCurrentPost = function (post) {
        localStorage.setItem('post', post._id);
        this.post = post;
        console.log(post);
    };
    //logout
    AuthService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        this.post = null;
        localStorage.clear();
    };
    //get token form local storage and run it in the getProfile
    AuthService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    //load post id
    AuthService.prototype.loadPost = function () {
        var post = localStorage.getItem('post');
        this.post = post;
        console.log("load post id:" + this.post);
    };
    AuthService.prototype.searchPosts = function (title) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var url = 'users/posts/all/' + title;
        //console.log("url is:"+url);
        return this.http.get(url, { headers: headers }).map(function (res) { return res.json(); });
    };
    //getting a profile
    AuthService.prototype.getProfile = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        //getting the token 
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('users/profile', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //get a specific post
    AuthService.prototype.getPost = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        this.loadPost();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        var id = this.post;
        var url = 'users/post/' + id;
        //console.log(url);
        return this.http.get(url, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //get all user posts
    AuthService.prototype.getAllUserPosts = function (userID) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        var id = userID;
        var url = '/users/posts/' + id;
        console.log("url is:" + url);
        return this.http.get(url, { headers: headers }).map(function (res) { return res.json(); });
    };
    //get all posts
    AuthService.prototype.getPosts = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        //getting the token 
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('users/posts', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //check if logged in and token not expired
    AuthService.prototype.loggedIn = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])("id_token");
    };
    var _a;
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" ? _a : Object])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=../../src/app/services/auth.service.js.map

/***/ }),

/***/ 397:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 397;


/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(516);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=../../src/main.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(698),
            styles: [__webpack_require__(688)]
        })
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=../../src/app/app.component.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_navbar_navbar_component__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_dashboard_dashboard_component__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_profile_profile_component__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_addpost_addpost_component__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_userposts_userposts_component__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_post_post_component__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_validate_service__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__guards_auth_guard__ = __webpack_require__(526);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















//add routes to components
var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__["a" /* RegisterComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'post', component: __WEBPACK_IMPORTED_MODULE_14__components_post_post_component__["a" /* PostComponent */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_10__components_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_11__components_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'addpost', component: __WEBPACK_IMPORTED_MODULE_12__components_addpost_addpost_component__["a" /* AddpostComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__guards_auth_guard__["a" /* AuthGuard */]] },
    { path: 'userposts', component: __WEBPACK_IMPORTED_MODULE_13__components_userposts_userposts_component__["a" /* UserpostsComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_18__guards_auth_guard__["a" /* AuthGuard */]] },
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_addpost_addpost_component__["a" /* AddpostComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_post_post_component__["a" /* PostComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_userposts_userposts_component__["a" /* UserpostsComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
                __WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages__["FlashMessagesModule"]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_15__services_validate_service__["a" /* ValidateService */], __WEBPACK_IMPORTED_MODULE_17__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_18__guards_auth_guard__["a" /* AuthGuard */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=../../src/app/app.module.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddpostComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddpostComponent = /** @class */ (function () {
    function AddpostComponent(flashMessage, authService, router) {
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
    }
    AddpostComponent.prototype.ngOnInit = function () {
    };
    AddpostComponent.prototype.onPostSubmit = function () {
        var _this = this;
        //get the current user
        this.authService.getProfile().subscribe(function (data) {
            _this.user = data.user;
            _this.userID = data.user._id;
            _this.username = data.user.username;
            //console.log(data);
            console.log(_this.username);
            //create a new post
            //console.log("adding a new post");
            //checking if private is checked
            if (_this.private == undefined)
                _this.private = false;
            //console.log(this.private);
            //check if posts has a title
            if (!_this.title) {
                _this.flashMessage.show("Add title to your post", { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate(['/addpost']);
                return false;
            }
            //check if post has a content
            if (!_this.content) {
                _this.flashMessage.show("Add content to your post", { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate(['/addpost']);
                return false;
            }
            else {
                //createa a post object
                var post = {
                    userID: _this.userID,
                    username: _this.username,
                    title: _this.title,
                    content: _this.content,
                    private: _this.private
                };
                //console.log("creating a new post");
                //console.log("adding post to mongo:"+post.private);
                //add post to database
                _this.authService.addPost(post).subscribe(function (data) {
                    //adding post to posts collection was successful
                    if (data.success) {
                        //add post to user's posts
                        _this.authService.updateUserPost(_this.userID, _this.title).subscribe(function (data) {
                            if (data.success) {
                                _this.flashMessage.show("A new post added", { cssClass: 'alert-success', timeout: 3000 });
                                _this.router.navigate(['/dashboard']);
                            }
                            else {
                                _this.flashMessage.show("Something went wrong. Please try again", { cssClass: 'alert-danger', timeout: 3000 });
                                _this.router.navigate(['/addpost']);
                            }
                        });
                        //something went wrong
                    }
                    else {
                        _this.flashMessage.show("Something went wrong. Please try again", { cssClass: 'alert-danger', timeout: 3000 });
                        _this.router.navigate(['/addpost']);
                    }
                    return true;
                });
            }
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    var _a, _b, _c;
    AddpostComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-addpost',
            template: __webpack_require__(699),
            styles: [__webpack_require__(689)]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" ? _c : Object])
    ], AddpostComponent);
    return AddpostComponent;
}());

//# sourceMappingURL=../../src/app/components/addpost/addpost.component.js.map

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
        this.posts = [];
        this.allPosts = [];
        this.postCount = 5;
        this.maxPostCount = 0;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        //get all of the posts from db
        this.authService.getPosts().subscribe(function (data) {
            //console.log(data);
            //max count is the number of public posts in db
            _this.maxPostCount = data.length;
            //console.log(data.length);
            _this.allPosts = data;
            //get only the 5 first posts
            _this.posts = data.slice(0, _this.postCount);
            //console.log(this.posts);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    //when search btn is pressed
    DashboardComponent.prototype.onSearchPressed = function () {
        //console.log(this.searchText);
        var _this = this;
        //if does not have text
        if (this.searchText == undefined || this.searchText == "") {
            //get all posts
            this.authService.getPosts().subscribe(function (data) {
                // console.log(data);
                //max count is the number of public posts in db
                _this.maxPostCount = data.length;
                //console.log(data.length);
                //now has 5 posts
                _this.postCount = 5;
                //get only the 5 first posts
                _this.posts = data.slice(0, _this.postCount);
                console.log(_this.posts);
            }, function (err) {
                console.log(err);
                return false;
            });
            //had search term
        }
        else {
            //get all posts that contain search title
            this.authService.searchPosts(this.searchText).subscribe(function (data) {
                //console.log(data);
                //get posts that allign with the search term
                _this.posts = data;
                //console.log(data.length)
                _this.postCount = data.length;
            });
            //reset search
            this.searchText = "";
        }
    };
    //more posts btn was pressed
    DashboardComponent.prototype.onMorePostPressed = function () {
        //check that can have more posts
        if (this.maxPostCount > this.postCount) {
            //update post count
            this.postCount += 5;
            //add more posts to page
            this.posts = this.allPosts.slice(0, this.postCount);
        }
        else {
            //does not have more posts
            var btn = document.getElementById("morePosts");
            btn.setAttribute('disabled', 'true');
            this.flashMessage.show("No more posts to be shown", { cssClass: 'alert-success', timeout: 5500 });
        }
    };
    //post is pressed
    DashboardComponent.prototype.onSelect = function (post) {
        //store the current post to local storage
        this.authService.storeCurrentPost(post);
        //this.authService.getPost(post)
        console.log("post id = " + post._id);
        var url = 'post/' + post._id;
        //navigate to post page
        return this.router.navigate(['/post']);
    };
    var _a, _b, _c;
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(700),
            styles: [__webpack_require__(690)]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" ? _c : Object])
    ], DashboardComponent);
    return DashboardComponent;
}());

//# sourceMappingURL=../../src/app/components/dashboard/dashboard.component.js.map

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(701),
            styles: [__webpack_require__(691)]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());

//# sourceMappingURL=../../src/app/components/home/home.component.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    //login submit
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        //create an user object
        var user = {
            username: this.username,
            password: this.password
        };
        //check that user has an account
        this.authService.authenticateUser(user).subscribe(function (data) {
            //if correct username and password
            if (data.success) {
                _this.authService.storeUserData(data.token, data.user);
                _this.flashMessage.show("Logged in", { cssClass: 'alert-success', timeout: 5500 });
                _this.router.navigate(['dashboard']);
            }
            else {
                _this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 5500 });
                _this.router.navigate(['login']);
            }
        });
    };
    var _a, _b, _c;
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(702),
            styles: [__webpack_require__(692)]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" ? _c : Object])
    ], LoginComponent);
    return LoginComponent;
}());

//# sourceMappingURL=../../src/app/components/login/login.component.js.map

/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    //log out
    NavbarComponent.prototype.onLogoutClick = function () {
        this.authService.logout();
        this.flashMessage.show('Logged out', { cssClass: 'alert-success', timeout: 4000 });
        this.router.navigate(['/login']);
        return false;
    };
    var _a, _b, _c;
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(703),
            styles: [__webpack_require__(693)]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" ? _c : Object])
    ], NavbarComponent);
    return NavbarComponent;
}());

//# sourceMappingURL=../../src/app/components/navbar/navbar.component.js.map

/***/ }),

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PostComponent = /** @class */ (function () {
    function PostComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    PostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.count = 0;
        //get the post that was selected
        this.authService.getPost().subscribe(function (data) {
            _this.currentPost = data;
            _this.content = data.content;
            _this.private = data.private;
            // console.log(data);
            //get the current user  
            _this.authService.getProfile().subscribe(function (user) {
                //console.log(user.user._id);
                //console.log(data.userID);
                //get edit btn and set it visible if current user is the poster of that post
                var editbtn = document.getElementById("edit-btn");
                if (user.user._id == data.userID) {
                    editbtn.style.visibility = "visible";
                }
            }), function (err) {
                console.log(err);
                return false;
            };
        }), function (err) {
            console.log(err);
            return false;
        };
    };
    //saving post btn is pressed
    PostComponent.prototype.onSavePressed = function () {
        //get the new content and private/public
        var _this = this;
        //console.log(this.content);
        console.log(this.private);
        //console.log("current content:\n"+this.currentPost.content);
        //private is false
        if (this.private == undefined)
            this.private = false;
        this.currentPost.private = this.private;
        this.currentPost.content = this.content;
        //modify the post
        this.authService.modifyPost(this.currentPost).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show("Post was modified", { cssClass: 'alert-success', timeout: 5500 });
                _this.router.navigate(['dashboard']);
            }
            else {
                _this.flashMessage.show("Something went wrong. Could not modify the post. Please try again", { cssClass: 'alert-danger', timeout: 5500 });
            }
        });
        console.log("save pressed");
        //this.currentPost.content = updateContent;
    };
    //set editing options visible
    PostComponent.prototype.onEditPressed = function () {
        if (this.count < 1) {
            var removebtn = document.getElementById("remove-btn");
            var editbtn = document.getElementById("edit-btn");
            var privateBox = document.getElementById("private");
            var privateText = document.getElementById("privateText");
            var saveBtn = document.getElementById("submit");
            var spanText = document.getElementById("spantext");
            var content = document.getElementById("content");
            editbtn.style.visibility = 'hidden';
            content['disabled'] = false;
            this.count += 1;
            this.currentPost.content = "";
            removebtn.style.visibility = "visible";
            privateBox.style.visibility = "visible";
            saveBtn.style.visibility = "visible";
            privateText.style.visibility = "visible";
            spanText.style.visibility = "visible";
        }
    };
    //remove was pressed
    PostComponent.prototype.onRemovePressed = function () {
        var _this = this;
        //console.log("remove was pressed");
        // console.log(this.currentPost);
        //delete the post
        this.authService.deletePost(this.currentPost).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show("Post removed", { cssClass: 'alert-success', timeout: 5500 });
                _this.router.navigate(['dashboard']);
            }
            else {
                _this.flashMessage.show("Something went wrong. Could not delete the post. Please try again", { cssClass: 'alert-danger', timeout: 5500 });
            }
        });
    };
    var _a, _b, _c;
    PostComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-post',
            template: __webpack_require__(704),
            styles: [__webpack_require__(694)]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"]) === "function" ? _c : Object])
    ], PostComponent);
    return PostComponent;
}());

//# sourceMappingURL=../../src/app/components/post/post.component.js.map

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        //get the current user sata
        this.authService.getProfile().subscribe(function (data) {
            _this.user = data.user;
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    //go to all user posts page
    ProfileComponent.prototype.onShowAllPostsPressed = function () {
        return this.router.navigate(['/userposts'], this.user);
    };
    var _a, _b;
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(705),
            styles: [__webpack_require__(695)]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" ? _b : Object])
    ], ProfileComponent);
    return ProfileComponent;
}());

//# sourceMappingURL=../../src/app/components/profile/profile.component.js.map

/***/ }),

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(validateService, flashMessage, authService, router) {
        this.validateService = validateService;
        this.flashMessage = flashMessage;
        this.authService = authService;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    //register btn was pressed
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        //console.log("registering a new user");
        //create user
        var user = {
            name: this.name,
            email: this.email,
            password: this.password,
            username: this.username
        };
        //check if all fields have somehting in them
        if (!this.validateService.validateRegister(user)) {
            this.flashMessage.show("Put something into all of the fields", { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        //check that email is in correct format
        if (!this.validateService.validateEmail(user.email)) {
            this.flashMessage.show("Give your email in correct format", { cssClass: 'alert-danger', timeout: 3000 });
            return false;
        }
        //register the user
        this.authService.registerUser(user).subscribe(function (data) {
            if (data.success) {
                _this.flashMessage.show("You were registers. Please login", { cssClass: 'alert-success', timeout: 3000 });
                _this.router.navigate(['/login']);
            }
            else {
                _this.flashMessage.show("Something went wrong. Please try again", { cssClass: 'alert-danger', timeout: 3000 });
                _this.router.navigate(['/register']);
            }
        });
    };
    var _a, _b, _c, _d;
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(706),
            styles: [__webpack_require__(696)]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === "function" ? _b : Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" ? _c : Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" ? _d : Object])
    ], RegisterComponent);
    return RegisterComponent;
}());

//# sourceMappingURL=../../src/app/components/register/register.component.js.map

/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserpostsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserpostsComponent = /** @class */ (function () {
    function UserpostsComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.posts = [];
    }
    UserpostsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //get current user
        this.authService.getProfile().subscribe(function (data) {
            _this.user = data.user;
            // console.log(this.user.username);
            //get all user posts 
            _this.authService.getAllUserPosts(_this.user._id).subscribe(function (data) {
                //console.log(data[0]);
                _this.posts = data[0];
            }, function (err) {
                console.log(err);
                return false;
            });
        }, function (err) {
            console.log(err);
            return false;
        });
        console.log(this.user);
    };
    //go to selected post page
    UserpostsComponent.prototype.onSelect = function (post) {
        this.authService.storeCurrentPost(post);
        //this.authService.getPost(post)
        //console.log("post id = "+post._id);
        return this.router.navigate(['/post']);
    };
    var _a, _b;
    UserpostsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-userposts',
            template: __webpack_require__(707),
            styles: [__webpack_require__(697)]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" ? _b : Object])
    ], UserpostsComponent);
    return UserpostsComponent;
}());

//# sourceMappingURL=../../src/app/components/userposts/userposts.component.js.map

/***/ }),

/***/ 526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        //if logged in
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            //redirect to login
            this.router.navigate(['/login']);
        }
        return false;
    };
    var _a, _b;
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" ? _a : Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" ? _b : Object])
    ], AuthGuard);
    return AuthGuard;
}());

//# sourceMappingURL=../../src/app/guards/auth.guard.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=../../src/environments/environment.js.map

/***/ }),

/***/ 688:
/***/ (function(module, exports) {

module.exports = ".container {\r\n    color: rgb(0, 0, 0);\r\n}"

/***/ }),

/***/ 689:
/***/ (function(module, exports) {

module.exports = "h2 {\r\n    color: rgb(209, 207, 207);\r\n    font-size: 50px;\r\n}\r\n\r\nbody {\r\n    padding: 50px;\r\n    font: 14px \"Lucida Grande\", Helvetica, Arial, sans-serif;\r\n    color: black;\r\n}\r\n\r\nlabel {\r\n    color: rgb(139, 130, 130);\r\n    font-size: 20px;\r\n}\r\n\r\n.form {\r\n    background-color: rgb(53, 50, 50);\r\n    padding-left: 0.5cm;\r\n    padding-right: 0.5cm;\r\n    padding-bottom: 0.5cm;\r\n    padding-top: 0.3cm;\r\n    border-radius: 15px;\r\n}"

/***/ }),

/***/ 690:
/***/ (function(module, exports) {

module.exports = "li {\r\n    cursor: pointer;\r\n    background-color: rgb(78, 74, 74);\r\n    margin: .5em;\r\n    border-radius: 15px;\r\n    padding-left: 0.5cm;\r\n    padding-top: 0.2cm;\r\n    padding-bottom: 0.2cm;\r\n}\r\n\r\n.search {\r\n    background-color: rgb(78, 74, 74);\r\n    padding-left: 0.3cm;\r\n    padding-right: 0.3cm;\r\n    padding-bottom: 0.3cm;\r\n    padding-top: 0.3cm;\r\n    border-radius: 15px;\r\n}\r\n\r\nlabel {\r\n    color: rgb(139, 130, 130);\r\n    padding-left: 0.2cm;\r\n    padding-top: 0.2cm;\r\n}\r\n\r\nli:hover {\r\n    color: rgb(29, 29, 32);\r\n    background-color: #707070;\r\n    left: .1em;\r\n}\r\n\r\n.posts {\r\n    background-color: rgb(53, 50, 50);\r\n    padding-left: 0.5cm;\r\n    padding-right: 0.5cm;\r\n    padding-bottom: 0.5cm;\r\n    padding-top: 0.3cm;\r\n    border-radius: 15px;\r\n}\r\n\r\n.wrapper {\r\n    text-align: center;\r\n}\r\n\r\n.button {\r\n    position: absolute;\r\n    top: 50%;\r\n}\r\n\r\n#title {\r\n    font-size: 30px;\r\n}\r\n\r\n.span {\r\n    color: rgb(209, 207, 207);\r\n}\r\n\r\n.span2 {\r\n    color: rgb(139, 130, 130);\r\n}\r\n\r\n.p {\r\n    color: rgb(139, 130, 130);\r\n    size: 10px;\r\n}\r\n\r\nh2 {\r\n    color: rgb(209, 207, 207);\r\n}\r\n\r\nh3 {\r\n    color: rgb(209, 207, 207);\r\n    text-align: left;\r\n}"

/***/ }),

/***/ 691:
/***/ (function(module, exports) {

module.exports = ".jumbotron {\r\n    background-color: rgb(78, 74, 74);\r\n    border-radius: 25px;\r\n    padding: 20px;\r\n}\r\n\r\n.row {\r\n    background-color: rgb(78, 74, 74);\r\n    border-radius: 25px;\r\n    padding: 20px;\r\n}"

/***/ }),

/***/ 692:
/***/ (function(module, exports) {

module.exports = "h2 {\r\n    color: rgb(209, 207, 207);\r\n}\r\n\r\n.form-signin {\r\n    background-color: rgb(53, 50, 50);\r\n    padding-left: 0.5cm;\r\n    padding-right: 0.5cm;\r\n    padding-bottom: 0.4cm;\r\n    padding-top: 0.4cm;\r\n    border-radius: 15px;\r\n}\r\n\r\nlabel {\r\n    color: rgb(139, 130, 130);\r\n    padding-left: 0.1cm;\r\n}\r\n\r\n.form-control {\r\n    padding-top: 0.2cm;\r\n    padding-bottom: 0.2cm;\r\n    font-size: 15px;\r\n}"

/***/ }),

/***/ 693:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 694:
/***/ (function(module, exports) {

module.exports = "h2 {\r\n    color: rgb(209, 207, 207);\r\n}\r\n\r\nform {\r\n    background-color: rgb(53, 50, 50);\r\n    padding-left: 0.5cm;\r\n    padding-right: 0.5cm;\r\n    padding-bottom: 0.5cm;\r\n    padding-top: 0.3cm;\r\n    border-radius: 15px;\r\n}\r\n\r\nlabel {\r\n    color: rgb(139, 130, 130);\r\n    font-size: 20px;\r\n    padding-bottom: 0.2cm;\r\n}"

/***/ }),

/***/ 695:
/***/ (function(module, exports) {

module.exports = "h2 {\r\n    color: rgb(209, 207, 207);\r\n}\r\n\r\nli {\r\n    background-color: rgb(78, 74, 74);\r\n    margin: 0.1cm;\r\n    border-radius: 10px;\r\n    padding-left: 0.5cm;\r\n    padding-top: 0.2cm;\r\n    padding-bottom: 0.2cm;\r\n    font-size: 20px;\r\n}\r\n\r\n.profile-div {\r\n    background-color: rgb(53, 50, 50);\r\n    padding-left: 0.5cm;\r\n    padding-right: 0.5cm;\r\n    padding-bottom: 0.1cm;\r\n    padding-top: 0.1cm;\r\n    border-radius: 15px;\r\n}"

/***/ }),

/***/ 696:
/***/ (function(module, exports) {

module.exports = "h2 {\r\n    color: rgb(209, 207, 207);\r\n}\r\n\r\nlabel {\r\n    color: rgb(139, 130, 130);\r\n    padding-left: 0.1cm;\r\n    padding-top: 0.2cm;\r\n}\r\n\r\n.form-control {\r\n    padding-top: 0.2cm;\r\n    padding-bottom: 0.2cm;\r\n    font-size: 15px;\r\n}\r\n\r\n.form-register {\r\n    background-color: rgb(53, 50, 50);\r\n    padding-left: 0.5cm;\r\n    padding-right: 0.5cm;\r\n    padding-bottom: 0.4cm;\r\n    padding-top: 0.4cm;\r\n    border-radius: 15px;\r\n}"

/***/ }),

/***/ 697:
/***/ (function(module, exports) {

module.exports = "li {\r\n    cursor: pointer;\r\n    background-color: rgb(78, 74, 74);\r\n    margin: .5em;\r\n    border-radius: 10px;\r\n    padding-left: 0.5cm;\r\n    padding-top: 0.2cm;\r\n    padding-bottom: 0.2cm;\r\n}\r\n\r\nli:hover {\r\n    color: rgb(29, 29, 32);\r\n    background-color: #707070;\r\n    left: .1em;\r\n}\r\n\r\n.wrapper {\r\n    text-align: center;\r\n}\r\n\r\nh2 {\r\n    color: rgb(209, 207, 207);\r\n}\r\n\r\n.label {\r\n    color: rgb(209, 207, 207);\r\n    padding-left: 0.2cm;\r\n    padding-top: 0.2cm;\r\n    font-size: 25px;\r\n}\r\n\r\n.label2 {\r\n    color: rgb(139, 130, 130);\r\n    padding-left: 0.2cm;\r\n    padding-top: 0.2cm;\r\n    font-size: 18px;\r\n}\r\n\r\n.posts {\r\n    background-color: rgb(53, 50, 50);\r\n    padding-left: 0.5cm;\r\n    padding-right: 0.5cm;\r\n    padding-bottom: 0.5cm;\r\n    padding-top: 0.3cm;\r\n    border-radius: 15px;\r\n}"

/***/ }),

/***/ 698:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\r\n<div class=\"container\">\r\n    <flash-messages></flash-messages>\r\n    <router-outlet></router-outlet>\r\n</div>"

/***/ }),

/***/ 699:
/***/ (function(module, exports) {

module.exports = "<div id=\"page\">\r\n    <h2>\r\n        Create a new post\r\n    </h2>\r\n    <form (submit)=\"onPostSubmit()\" class=\"form\">\r\n\r\n        <div class=\"form-group\">\r\n            <label for=\"title\">Title</label>\r\n            <input type=\"text\" [(ngModel)]=\"title\" name=\"title\" class=\"form-control\" id=\"title\" placeholder=\"Enter title\">\r\n        </div>\r\n        <br>\r\n\r\n        <div class=\"form-group\">\r\n            <label for=\"content\">Content</label>\r\n            <textarea style=\"resize: none;\" name=\"content\" class=\"form-control\" [(ngModel)]=\"content\" id=\"content\" cols=\"50\" rows=\"10\" placeholder=\"Write your post here\"></textarea>\r\n        </div>\r\n        <br>\r\n        <div class=\"form-group\">\r\n            <label for=\"private\"><input type=\"checkbox\" [(ngModel)]=\"private\" aria-describedby=\"privateText\" name=\"private\" id=\"private\" value=\"false\"><span>Private</span></label>\r\n            <br>\r\n            <small id=\"privateText\" class=\"form-text text-muted\">Check this is you want your post to be private so only you can see it</small>\r\n        </div>\r\n        <br>\r\n\r\n        <button id=\"submit\" type=\"submit\" class=\"btn btn-success  waves-effect\">Submit</button>\r\n    </form>\r\n</div>"

/***/ }),

/***/ 700:
/***/ (function(module, exports) {

module.exports = "<br>\r\n<h2 class=\"page-header\">All public posts</h2>\r\n\r\n<!--https://stackoverflow.com/questions/34656432/add-input-ng-model-search-to-group-filtering-->\r\n\r\n<label class=\"label\">Search for post titles</label>\r\n<br>\r\n\r\n\r\n<div class=\"search\">\r\n\r\n\r\n    <div class=\"d-flex\">\r\n\r\n        <input type=\"email\" class=\"form-control me-sm-2\" id=\"search-text\" aria-describedby=\"search-text\" [(ngModel)]=\"searchText\" placeholder=\"Enter text to search posts\" autofocus>\r\n        <button id=\"search-btn\" class=\"btn btn-light \" (click)=\"onSearchPressed()\">Search</button>\r\n    </div>\r\n\r\n</div>\r\n<br>\r\n<form class=\"form-posts\" (reset)=\"onMorePostPressed()\">\r\n    <div *ngIf=\"posts\">\r\n        <br>\r\n        <h3>Posts</h3>\r\n\r\n        <p class=\"p\">{{postCount}} posts found</p>\r\n        <div class=\"posts\">\r\n            <li *ngFor=\"let post of posts\" (click)=\"onSelect(post)\" style=\"list-style: none;\">\r\n                <span class=\"span\" id=\"title\">Title: {{post.title}}</span>\r\n                <br>\r\n                <span class=\"span2\">Posted by: {{post.username}}</span>\r\n            </li>\r\n        </div>\r\n        <br>\r\n        <div class=\"wrapper\">\r\n            <button id=\"morePosts\" type=\"reset\" class=\"btn btn-secondary  waves-effect\">Show more posts</button>\r\n        </div>\r\n\r\n    </div>\r\n</form>"

/***/ }),

/***/ 701:
/***/ (function(module, exports) {

module.exports = "<br>\r\n\r\n<body>\r\n    <h1>Full Stack course project</h1>\r\n    <div class=\"jumbotron text-center\">\r\n\r\n        <p class=\"lead\">This is a course project for FullStack course</p>\r\n        <p class=\"lead\">Below are all of the main pages of the application</p>\r\n        <div>\r\n            <a class=\"btn btn-primary\" [routerLink]=\"['/register']\">Register</a>\r\n            <a class=\"btn btn-primary\" [routerLink]=\"['/login']\">Login</a>\r\n        </div>\r\n    </div>\r\n    <br>\r\n\r\n\r\n    <h3> Functions of the Website</h3>\r\n    <div class=\"row te\">\r\n\r\n        <div class=\"col-md-4\">\r\n            <h3>Dashboard</h3>\r\n            <p>On this page all user posts that are public can be seen</p>\r\n            <p>Selecting a post open page where the full post can be seen</p>\r\n            <p>If user is the writer of the post, the post can be edited or deleted</p>\r\n            <p>There is a search funtion that searhes for the title of a post</p>\r\n        </div>\r\n        <div class=\"col-md-4\">\r\n            <h3>Add post</h3>\r\n            <p>On this page new posts can be added</p>\r\n            <p>Posts can be private or public</p>\r\n        </div>\r\n\r\n        <div class=\"col-md-4\">\r\n            <h3>Profile</h3>\r\n            <p>See full user profile</p>\r\n            <p>All user post can be accessed from here</p>\r\n        </div>\r\n\r\n    </div>\r\n</body>"

/***/ }),

/***/ 702:
/***/ (function(module, exports) {

module.exports = "<br>\r\n<h2 class=\"page-header\">Login</h2>\r\n<form class=\"form-signin\" (submit)=\"onLoginSubmit()\">\r\n    <div class=\"form-group\">\r\n        <label for=\"Username\">Username</label>\r\n        <input type=\"text\" class=\"form-control\" placeholder=\"Enter Username\" [(ngModel)]=\"username\" name=\"username\">\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <label for=\"Password\">Password</label>\r\n        <input type=\"password\" class=\"form-control\" placeholder=\" Enter Password\" [(ngModel)]=\"password\" name=\"password\">\r\n    </div>\r\n    <br>\r\n\r\n    <input class=\"btn btn-lg btn-success\" type=\"submit\" value=\"Login\">\r\n</form>"

/***/ }),

/***/ 703:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-md navbar-dark bg-dark top\">\r\n    <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n            <button style=\"visibility: hidden;\" type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\r\n        <!--<span class=\"sr-only\">Toggle navigation</span>-->\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n      </button>\r\n            <a class=\"navbar-brand\" href=\"#\">Full Stack Course Project</a>\r\n        </div>\r\n        <div id=\"navbar\" class=\"collapse navbar-collapse\">\r\n            <ul class=\"nav navbar-nav mr-auto\">\r\n                <li class=\"nav-item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a class=\"nav-link\" [routerLink]=\"['/']\">Home</a></li>\r\n\r\n            </ul>\r\n            <ul class=\"nav navbar-nav ml-auto\">\r\n                <li *ngIf=\"authService.loggedIn()\" class=\"nav-item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a class=\"nav-link\" [routerLink]=\"['/dashboard']\">Dashboard</a></li>\r\n                <li *ngIf=\"authService.loggedIn()\" class=\"nav-item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a class=\"nav-link\" [routerLink]=\"['/addpost']\">Add Post</a></li>\r\n                <li *ngIf=\"authService.loggedIn()\" class=\"nav-item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a class=\"nav-link\" [routerLink]=\"['/profile']\">Profile</a></li>\r\n                <li *ngIf=\"!authService.loggedIn()\" class=\"nav-item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a class=\"nav-link\" [routerLink]=\"['/login']\">Login</a></li>\r\n                <li *ngIf=\"!authService.loggedIn()\" class=\"nav-item\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a class=\"nav-link\" [routerLink]=\"['/register']\">Register</a></li>\r\n                <li *ngIf=\"authService.loggedIn()\" class=\"nav-item\"><a class=\"nav-link\" (click)=\"onLogoutClick()\" href=\"#\">Logout</a></li>\r\n            </ul>\r\n        </div>\r\n\r\n    </div>\r\n</nav>"

/***/ }),

/***/ 704:
/***/ (function(module, exports) {

module.exports = "<br>\r\n\r\n<div *ngIf=\"currentPost\">\r\n    <h2>Title: {{currentPost.title}}</h2>\r\n    <label>Posted by: {{currentPost.username}}</label>\r\n    <br>\r\n    <form (submit)=\"onSavePressed()\" class=\"form\">\r\n        <div class=\"form-group\" id=\"org-content-div\">\r\n            <label for=\"content\">Content</label>\r\n            <textarea [disabled]=\"true\" style=\"resize: none;\" [(ngModel)]=\"content\" name=\"content\" class=\"form-control\" id=\"content\" cols=\"50\" rows=\"10\">{{currentPost.content}}</textarea>\r\n        </div>\r\n        <!--<div class=\"form-group\" id=\"newDiv\">\r\n            <label style=\"visibility: hidden;\" for=\"content2\">Content</label>\r\n            <textarea style=\"visibility: hidden;\" [(ngModel)]=\"content2\" style=\"resize: none;\" name=\"content2\" class=\"form-control\" id=\"content2\" cols=\"50\" rows=\"10\" value=\"\"></textarea>\r\n        </div>-->\r\n        <div class=\"form-group\">\r\n            <label style=\"visibility: hidden;\" for=\"private\"><input type=\"checkbox\" [(ngModel)]=\"private\" aria-describedby=\"privateText\" name=\"private\" id=\"private\" value=\"false\"><span id=\"spantext\">Private</span></label>\r\n            <br>\r\n            <small style=\"visibility: hidden;\" id=\"privateText\" class=\"form-text text-muted\">Check this is you want your post to be private so only you can see it</small>\r\n        </div>\r\n        <br>\r\n        <div class=\"form-group\">\r\n            <button style=\"visibility: hidden;\" id=\"submit\" type=\"submit\" class=\"btn btn-success\">Save</button>\r\n        </div>\r\n\r\n    </form>\r\n    <br>\r\n    <div>\r\n        <button id=\"edit-btn\" class=\"btn btn-primary\" style=\"visibility: hidden;\" (click)=\"onEditPressed()\">Edit</button>\r\n        <button id=\"remove-btn\" class=\"btn btn-danger\" style=\"visibility: hidden;float: right;\" (click)=\"onRemovePressed()\">Remove</button>\r\n    </div>\r\n\r\n</div>"

/***/ }),

/***/ 705:
/***/ (function(module, exports) {

module.exports = "<br>\r\n<div *ngIf=\"user\">\r\n    <h2 class=\"page-header\">Profile page</h2>\r\n    <div class=\"profile-div\">\r\n        <ul class=\"list-group\">\r\n            <br>\r\n            <li class=\"list-group-item\">Username : {{user.username}}</li>\r\n            <li class=\"list-group-item\">Name : {{user.name}}</li>\r\n            <li class=\"list-group-item\">Email : {{user.email}}</li>\r\n            <li class=\"list-group-item\">Posts created: {{user.posts.length}} </li>\r\n            <br>\r\n        </ul>\r\n    </div>\r\n    <br>\r\n    <button class=\"btn btn-primary\" (click)=\"onShowAllPostsPressed()\">Show all own posts</button>\r\n</div>"

/***/ }),

/***/ 706:
/***/ (function(module, exports) {

module.exports = "<br>\r\n<div>\r\n    <h2 class=\"page-header\">Register a new user</h2>\r\n    <form (submit)=\"onRegisterSubmit()\" class=\"form-register\">\r\n        <div class=\"form-group\">\r\n            <label for=\"name\">Name</label>\r\n            <input type=\"text\" [(ngModel)]=\"name\" name=\"name\" class=\"form-control\" id=\"name\" placeholder=\"Enter Name\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"username\">Username</label>\r\n            <input type=\"text\" [(ngModel)]=\"username\" name=\"username\" class=\"form-control\" id=\"username\" placeholder=\"Enter Username\">\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"email\">Email</label>\r\n            <input type=\"email\" [(ngModel)]=\"email\" name=\"email\" class=\"form-control\" id=\"email\" aria-describedby=\"emailHelp\" placeholder=\"Enter Email\">\r\n\r\n        </div>\r\n        <div class=\"form-group\">\r\n            <label for=\"password\">Password</label>\r\n            <input type=\"password\" [(ngModel)]=\"password\" name=\"password\" class=\"form-control\" id=\"password\" placeholder=\" Enter Password\">\r\n        </div>\r\n        <br>\r\n        <input type=\"submit\" class=\"btn btn-success\" value=\"Submit\">\r\n    </form>\r\n</div>"

/***/ }),

/***/ 707:
/***/ (function(module, exports) {

module.exports = "<br>\n<div *ngIf=\"user\">\n    <h2 class=\"page-header\">All Posts of the user '{{user.username}}'</h2>\n    <label class=\"label2\">Press posts to see the contents and edit or delete the post</label>\n    <br>\n    <div *ngIf=\"posts\" class=\"posts\">\n\n        <li *ngFor=\"let post of posts\" (click)=\"onSelect(post)\" style=\"list-style: none;\">\n            <label class=\"label\">Title: {{post.title}}</label>\n\n        </li>\n    </div>\n\n</div>"

/***/ }),

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(398);


/***/ })

},[746]);
//# sourceMappingURL=main.bundle.map