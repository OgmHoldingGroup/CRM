import { Component, signal } from '@angular/core';
import { USERS } from '../../models/users-data';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users = USERS;
  toggleStatus(userId: number) {
    USERS.update((users) =>
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === 'active' ? 'disactive' : 'active',
            }
          : user
      )
    );
  }
}
