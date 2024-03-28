import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users!: User[]
  private usersChangesSubscription!: Subscription;
  loading = false;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.loadUsers();

    this.usersChangesSubscription = this.userService.users$.subscribe(users => {
      this.users = users;
    });
  }

  ngOnDestroy() {
    this.usersChangesSubscription.unsubscribe();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getAll().subscribe();
    this.loading = false;
  }

  // addUser(user: User) {
  //   this.userService.addUser();
  //   this.loadUsers();
  // }

  deleteUser(userId: any) {
    this.userService.deleteUser(userId).subscribe(data => {
      console.log(data)
    });
    this.loadUsers();
  }

  editUser(user: any) {
    this.userService.updateUser(user).subscribe();
  }

  navigateToMember(memberId: number) {
    this.router.navigate(['/member', memberId]);
  }
}

