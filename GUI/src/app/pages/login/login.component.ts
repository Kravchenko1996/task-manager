import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth-service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.auth.loginUser(this.loginForm.value)
        .subscribe((success: boolean) => {
          if (success) {
            this.router.navigateByUrl('/')
          }
        });
    }
  }
}
