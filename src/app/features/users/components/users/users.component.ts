import { Component, computed, signal } from '@angular/core';
import { USERS } from '../../models/users-data';
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CreateUserComponent } from '../create-user/create-user.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  imports: [CommonModule, PaginatorModule, CreateUserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  first = signal(0);
  rows = signal(5);
  users = USERS;
  totalRecords = computed(() => this.users().length);
  totalPages = computed(() => Math.ceil(this.totalRecords() / this.rows()));
  currentPage = computed(() => Math.floor(this.first() / this.rows()) + 1);

  // #########CreateUser######
  showCreateForm = signal(false);

  openForm() {
    this.showCreateForm.set(true);
  }

  closeForm() {
    this.showCreateForm.set(false);
  }
  // #########CreateUser######
  // #########onSearch######
  searchText = signal<string | null>(null);
  searchRole = signal<string | null>(null);
  searchStatus = signal<string | null>(null);
  filteredUsers = computed(() => {
    return this.users().filter((user: User) => {
      const matchName =
        !this.searchText() ||
        user.full_name
          .toLowerCase()
          .includes(this.searchText()!.toLowerCase()) ||
        user.username.toLowerCase().includes(this.searchText()!.toLowerCase());
      const matchRole =
        !this.searchRole() || user.roles.includes(this.searchRole()!);

      const matchStatus =
        !this.searchStatus() || user.status === this.searchStatus();

      return matchName && matchRole && matchStatus;
    });
  });

  onSearch() {
    this.first.set(0);
  }

  // #########onSearch######
  paginatedUsers = computed(() => {
    // const allUsers = this.users();
    const allUsers = this.filteredUsers(); // <-- أهم تعديل

    const start = this.first();
    const end = start + this.rows();
    return allUsers.slice(start, end);
  });

  pageButtons = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const buttons: (number | string)[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        buttons.push(i);
      }
      return buttons;
    }

    buttons.push(1);

    if (current <= 3) {
      buttons.push(2, 3, 4, '...');
    } else if (current > 3 && current < total - 2) {
      buttons.push('...');
      buttons.push(current - 1, current, current + 1);
      buttons.push('...');
    } else {
      buttons.push('...');
      buttons.push(total - 3, total - 2, total - 1);
    }

    if (total !== 1 && buttons[buttons.length - 1] !== total) {
      buttons.push(total);
    }

    return buttons.filter(
      (value, index, self) => self.indexOf(value) === index
    );
  });

  onRowsPerPageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newRows = parseInt(target.value, 10);
    this.rows.set(newRows);
    this.first.set(0);
  }

  goToPage(pageNumber: number) {
    this.first.set((pageNumber - 1) * this.rows());
  }

  prevPage() {
    const newFirst = this.first() - this.rows();
    if (newFirst >= 0) {
      this.first.set(newFirst);
    }
  }

  nextPage() {
    const newFirst = this.first() + this.rows();
    if (newFirst < this.totalRecords()) {
      this.first.set(newFirst);
    }
  }

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
