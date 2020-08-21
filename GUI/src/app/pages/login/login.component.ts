import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth-service/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LoginResponse} from "../../shared/interfaces/http-responses";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  errors: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
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
        .subscribe(
          (response: LoginResponse) => {
            if (response) {
              this.toastr.success('Successfully!')
              this.router.navigateByUrl('/');
            }
          },
          error => {
            Object.values(error.error).forEach((err: string) => {
              this.errors.push(err)
            });
            this.errors.forEach(error => {
              this.toastr.warning(error);
            })
            this.errors = [];
          }
        );
    }
  }

  refreshToken() {
    this.auth.refreshToken({token: this.auth.getToken()})
      .subscribe()
  }
}
