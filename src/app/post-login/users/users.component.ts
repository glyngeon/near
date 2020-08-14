import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpHandlerService } from '../../providers/http-handler.service';
import { UserList } from '../../../assets/user-list';
import { ShareService } from '../../providers/share.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    public usersResponse: any = [];
    constructor(private router: Router, private httpHandler: HttpHandlerService, private shareService: ShareService) {}

    ngOnInit(): void {
        this.httpHandler.usersCall().subscribe(
            (response: any) => {
                if (response.status === 200) {
                    this.usersResponse = response.result;
                }
            },
            (error) => {
                console.log(error);
            }
        );

        if (this.usersResponse.length === 0) {
            console.log(UserList);
            this.usersResponse = JSON.parse(localStorage.getItem('UserData'));
            if (!this.usersResponse) {
                console.log(UserList);
                localStorage.setItem('UserData', JSON.stringify(UserList));
            }
        }
    }

    public userDetail(index: number) {
        this.router.navigate(['userDetails/', this.usersResponse[index].id]);
    }

    public updateUser(index: number) {
        const tempUser = JSON.parse(localStorage.getItem('UserData'));
        this.shareService.setUserDetails({ userDetails: tempUser[index] || this.usersResponse[index], choice: 1, id: index });
        this.router.navigate(['newUser']);
    }

    public deleteUser(index: number) {
        this.usersResponse.splice(index, 1);
        const tempUser = JSON.parse(localStorage.getItem('UserData'));
        tempUser.splice(index, 1);
        localStorage.setItem('UserData', JSON.stringify(tempUser));
    }

    public addUser() {
        this.router.navigate(['newUser']);
    }
}
