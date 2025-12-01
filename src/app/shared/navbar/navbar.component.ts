import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isOpened = signal(false);

  openNavBar() {
    console.log(this.isOpened());
    this.isOpened.update((currentValue) => !currentValue);
  }

  operational = signal([
    { id: 'vessel-particular', title: 'Vessel Particular', file: '1.png' },
    { id: 'operational-request', title: 'Operational Request', file: '2.png' },
    { id: 'operation-center', title: 'Operation Center', file: '3.png' },
    { id: 'track-management', title: 'Track Management', file: '4.png' },
    { id: 'transit-operation', title: 'Transit Operation', file: '5.png' },
    { id: 'convoy', title: 'Convoy', file: '6.png' },
    { id: 'verbal', title: 'Verbal', file: '7.png' },
    { id: 'Roles', title: 'Roles', file: '8.png' },
    { id: 'Users', title: 'Users', file: '9.png' },
  ]);
  userManagement = signal([]);
  user = signal({
    name: 'Omar Mansor',
    role: 'Admin',
  });
}
