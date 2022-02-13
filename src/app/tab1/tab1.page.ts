import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  userDetail: string;
  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.authService.userDetails().subscribe(response => {
      if (response !== null) {
        this.userDetail = response.email;
      } else {
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log(error);
    });
  }
  signOut() {
    this.authService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('signin');
      })
      .catch(error => {
        console.log(error);
      });
  }
}
