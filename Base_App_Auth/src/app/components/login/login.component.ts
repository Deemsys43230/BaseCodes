import { Component, OnInit } from '@angular/core';
import { CoinService } from '../../coin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';
  loginForm: FormGroup;
  constructor(private router: Router, private coinservice: CoinService, private fb: FormBuilder) {
    this.userLoginForm();
   }
   userLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
   });
  }
  login(email, password) {
      this.coinservice.loginUser(email, password);
      this.router.navigate(['index']);
  }
  ngOnInit() {
  }
}
