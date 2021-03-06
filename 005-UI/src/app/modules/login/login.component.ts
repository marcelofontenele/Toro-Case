import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

    error:string;

    form:FormGroup;

    constructor(private fb:FormBuilder, 
                 private authService: AuthService, 
                 private router: Router) {

        this.form = this.fb.group({
            login: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    login() {
        const val = this.form.value;

        if (val.login && val.password) {
            this.authService.login(val.login, val.password)
                .subscribe(
                    () => {
                        this.router.navigateByUrl('/user');
                    },
                    (error) => {
                        this.error = error.error.message;
                    }
                );
        }
    }

}
