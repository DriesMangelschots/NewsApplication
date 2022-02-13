import { Component, OnInit } from '@angular/core';
import {User} from '../../services/user';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormGroup,FormBuilder, Validators, FormControl} from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  user: User;
  userForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  errorMsg = {
    email: [
      {
        type: 'required',
        message: 'Provide email.'
      },
      {
        type: 'pattern',
        message: 'Email is not valid.'
      }
    ],
    password: [
      {
        type: 'required',
        message: 'Password is required.'
      },
      {
        type: 'minlength',
        message: 'Password length should be 6 characters long.'
      }
    ],
  };
  constructor(public authService: AuthService, public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  signIn(value) {
    this.authService.signinUser(value)
      .then((response) => {
        this.errorMessage = '';
        this.router.navigateByUrl('tab1');
      }, error => {
        //this.errorMsg = error.message;
        this.errorMsg = error.message;
        this.successMessage = '';
        window.alert('User does not exist, try again or register first!');
      });
  }
  goToSignup() {
    this.router.navigateByUrl('/signup');
  }

}
