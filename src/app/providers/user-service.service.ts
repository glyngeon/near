import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class UserServiceService {
    private previousPath: string;
    constructor(private activatedRoute: ActivatedRoute, private location: Location, private router: Router) {}

    public getUser(): any {
        const outputObj = localStorage.getItem('token');
        if (outputObj) {
            return JSON.parse(outputObj);
        } else {
            return null;
        }
    }

    public setUser(currentUser) {
        localStorage.setItem('token', JSON.stringify(currentUser));
    }

    public userlogout() {
        localStorage.removeItem('token');
    }

    public authGuardActivate(route): boolean {
        // route is the route where gaurd is working/ where user wants to go
        const user = this.getUserForAuthGuard();
        if (user) {
            if (route.url.toString() === 'login') {
                if (this.previousPath === 'users') {
                    this.location.back();
                } else {
                    this.router.navigate(['users']);
                }
                return false;
            } else {
                return true;
            }
        } else {
            if (route.url.toString() === 'login') {
                return true;
            } else if (route.url.toString() === 'post') {
                this.router.navigate(['login']);
            } else {
                this.location.back();
                return false;
            }
        }
    }

    public getUserForAuthGuard(): any {
        const outputObj = localStorage.getItem('token');
        if (outputObj) {
            return JSON.parse(outputObj);
        } else {
            return null;
        }
    }
}
