import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [NgClass, RouterLink, RouterLinkActive],
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
    {
      id: 'vessel-particular',
      title: 'Vessel Particular',
      file: '1.png',
      router: 'vessel-particular',
    },
    {
      id: 'operational-request',
      title: 'Operational Request',
      file: '2.png',
      router: 'operational-request',
    },
    {
      id: 'operation-center',
      title: 'Operation Center',
      file: '3.png',
      router: 'operation-center',
    },
    {
      id: 'track-management',
      title: 'Track Management',
      file: '4.png',
      router: 'track-management',
    },
    {
      id: 'transit-operation',
      title: 'Transit Operation',
      file: '5.png',
      router: 'transit-operation',
    },
    { id: 'convoy', title: 'Convoy', file: '6.png', router: 'convoy' },
    { id: 'verbal', title: 'Verbal', file: '7.png', router: 'verbal' },
    { id: 'Roles', title: 'Roles', file: '8.png', router: 'roles' },
    { id: 'Users', title: 'Users', file: '9.png', router: 'users-list' },
  ]);

  userManagement = signal([]);
  user = signal({
    name: 'Omar Mansor',
    role: 'Admin',
  });
}
