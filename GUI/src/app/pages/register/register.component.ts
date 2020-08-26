import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth-service/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../shared/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  errors: string[] = [];
  newUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.newUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  createNewUser() {
    if (this.newUserForm.valid) {
      let newUserData = {
        ...this.newUserForm.value
      };
      this.api.createNewUserData(newUserData)
        .subscribe((response: User) => {
          this.router.navigateByUrl('auth/login');
          this.toastr.success(`User ${response.username} has been created!`);
        }, error => {
          Object.values(error.error).forEach((err: string) => {
            this.errors.push(err);
          });
          this.errors.forEach(error => {
            this.toastr.warning(error);
          });
          this.errors = [];
        });
    }
  }
}
