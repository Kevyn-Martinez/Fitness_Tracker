import { Injectable } from "@angular/core";
import { Person } from "./Person";
import { Http } from "@angular/http";
import { Router } from "@angular/router";
import { Exercise } from "./Exercise";

declare var window: any;
declare var FB: any;

@Injectable()
export class SharingService {
  apiRoot: string;
  me: Person;

  constructor(private http: Http, private router: Router) {
    this.apiRoot = `//${window.location.hostname}:8081`;

    window.fbAsyncInit = function () {
      FB.init({
        appId: "1416318998497364",
        cookie: true,
        xfbml: true,
        version: "v2.11"
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = <HTMLScriptElement>d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");


  }

  loginFB() {
    FB.login(
      (response: any) => {
        if (response.authResponse) {
          //console.log(response);
          FB.api("/me?fields=name,email,picture", (response: any) => {

            this.login(
              response.name,
              "password",
              response.id,
              response.picture.data.url
            );
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
      },
      { scopes: "email,user_photos,user_posts" }
    );
  }

  login(name: string, password: string, fbid?: string, picture?: string) {
    let myExercises: Exercise[];
    this.http
      .post(this.apiRoot + "/share/room/players", {
        name,
        password,
        myExercises,
        fbid,
        picture
      })
      .subscribe(
      data => {
        this.me = data.json();
        this.http.get(this.apiRoot + "/share/myExercises").subscribe(data => {
          this.me.myExercises = data.json();
        });
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => { }
      );
  }
}