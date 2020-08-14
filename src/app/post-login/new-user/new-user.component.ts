import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { HttpHandlerService } from '../../providers/http-handler.service';
import { UserServiceService } from '../../providers/user-service.service';
import { ShareService } from 'src/app/providers/share.service';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
    public submitted: boolean;
    public errorMessage: string;
    private choice: number;
    private index: number;
    constructor(private router: Router, private fb: FormBuilder, private httpHandler: HttpHandlerService, private shareService: ShareService, private location: Location) {}

    public newUserForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        userName: ['', Validators.required],
        age: ['', Validators.required],
        salary: ['', Validators.required],
    });

    ngOnInit(): void {
        this.submitted = false;
        this.shareService.shareUserDetails.subscribe((value) => {
            this.choice = value && value.choice;
            this.index = value && value.id;
            if (this.choice === 1) {
                this.newUserForm.controls.firstName.setValue(value.userDetails.firstName);
                this.newUserForm.controls.lastName.setValue(value.userDetails.lastName);
                this.newUserForm.controls.userName.setValue(value.userDetails.userName);
                this.newUserForm.controls.age.setValue(value.userDetails.age);
                this.newUserForm.controls.salary.setValue(value.userDetails.salary);
            }
        });
    }

    get f() {
        return this.newUserForm.controls;
    }

    public onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.newUserForm.invalid) {
            return;
        } else {
            this.httpHandler.addNewUserCall(this.newUserForm.value).subscribe(
                (response: any) => {
                    if (response.status === 200) {
                        this.submitted = false;
                        this.router.navigate(['users']);
                        this.newUserForm.patchValue({
                            userName: null,
                            firstName: null,
                            lastName: null,
                            age: null,
                            salary: null,
                        });
                    }
                },
                (error) => {
                    console.log(error);
                }
            );

            // for store data in dummy user list If api not working ( temp purpose)
            if (this.submitted) {
                const tempUser = JSON.parse(localStorage.getItem('UserData'));
                if (this.choice === 1) {
                    tempUser.splice(this.index, 1);
                    localStorage.setItem('UserData', JSON.stringify(tempUser));
                    const tempUser1 = JSON.parse(localStorage.getItem('UserData'));
                    tempUser1[this.index].push(this.newUserForm.value);
                    localStorage.setItem('UserData', JSON.stringify(tempUser1));
                } else {
                    tempUser.push(this.newUserForm.value);
                    localStorage.setItem('UserData', JSON.stringify(tempUser));
                }
                this.router.navigate(['users']);
            }
        }
    }
    public back() {
        this.location.back();
    }
}
