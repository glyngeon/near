import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { HttpHandlerService } from '../providers/http-handler.service';
import { UserServiceService } from '../providers/user-service.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
    public submitted: boolean;
    public errorMessage: string;
    private user = { userName: 'alex123', password: 'alex123' }; // this object for verify dummy user
    constructor(private router: Router, private fb: FormBuilder, private httpHandler: HttpHandlerService, private userService: UserServiceService) {}

    public signinForm = this.fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required],
    });

    ngOnInit(): void {
        this.submitted = false;
    }

    get f() {
        return this.signinForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.signinForm.invalid) {
            return;
        } else {
            if (JSON.stringify(this.user) === JSON.stringify(this.signinForm.value)) {
                this.httpHandler.loginCall(this.signinForm.value).subscribe(
                    (response: any) => {
                        // if (response.status === 200) {
                        this.userService.setUser(response);
                        this.router.navigate(['users']);
                        this.submitted = false;
                        this.signinForm.patchValue({
                            userName: null,
                            password: null,
                        });
                        // }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
                this.userService.setUser(this.user);
                this.router.navigate(['users']);
            } else {
                this.errorMessage = 'Please Enter valid user name or password';
            }
        }
    }
}
