import { NgStyle } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  imports: [FormsModule, NgStyle],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  selectedUserType: string = 'activeDirectory';
  close = output();
  closeForm() {
    this.close.emit();
  }
  onUserTypeChange(type: string) {
    this.selectedUserType = type;
  }
}
