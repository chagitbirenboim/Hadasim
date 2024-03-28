import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '@app/_models/user';
import { UserService } from '@app/_services/user.service';

@Component({ templateUrl: 'home.component.html',
styleUrls:['home.component.css']
})
export class HomeComponent {
    loading = false;
    users?: User[];
    // users$: Observable<User[]>;
    constructor(private userService: UserService) { }

    ngOnInit() {
        // this.loading = true;
        // this.userService.getAll().pipe(first()).subscribe(users => {
        //     debugger
        //     this.loading = false;
        //     this.users = users;
        // });
        // this.userService.getUsersFromServer().subscribe(users => {
        //     this.users$ = of(users);
        //   });
    }

    deleteUser(id: any) {
        this.userService.deleteUser(id)
    }
}