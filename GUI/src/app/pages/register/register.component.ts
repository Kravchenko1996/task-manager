import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth-service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  hide = true;
  newUserForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private api: AuthService,
    private router: Router
  ) {
  }


  createNewUser() {
    if (this.newUserForm.valid) {
      let newUserData = {
        ...this.newUserForm.value
      };
      this.api.createNewUserData(newUserData)
        .subscribe(() => {
            this.router.navigateByUrl('auth/login')
          },
          error => console.log('error: ', error))
    }
  }
}
