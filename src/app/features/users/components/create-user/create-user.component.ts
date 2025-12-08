import { NgStyle } from '@angular/common';
import { Component, OnInit, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { mainUserData } from '../../models/main-user-data';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-create-user',
  imports: [FormsModule, NgStyle, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnInit {
  selectedUserType: string = 'activeDirectory';
  mainUserData = mainUserData;
  close = output();
  form!: FormGroup;
  userNotFound: boolean = false;
  userFound: boolean = false;

  constructor(private fb: FormBuilder) {}

  fetchFromMainUserData() {
    const username = this.form.get('userName')?.value?.trim();

    if (!username) {
      alert('Please enter a username first');
      return;
    }

    const foundUser = this.mainUserData().find(
      (user: User) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (foundUser) {
      this.form.patchValue({
        // userName: foundUser.username,
        // fullName: foundUser.full_name,
        // mobile: foundUser.mobile,
        // status: foundUser.status,
        userName: foundUser?.username,
        fullName: foundUser.full_name,
        nickname: '',
        mobile: foundUser.mobile,
        department: '',
        division: '',
        sector: '',
        controlCenter: '',
        role: foundUser.roles[0] || '',
        status: foundUser.status,
      });

      this.userFound = true;
      this.userNotFound = false;

      console.log('User found and loaded:', foundUser);
    } else {
      this.userNotFound = true;
      this.userFound = false;

      this.form.patchValue({
        fullName: '',
        nickname: '',
        mobile: '',
        status: '',
      });

      console.log('User not found in Active Directory');
    }
  }

  buildForm() {
    this.form = this.fb.group({
      userName: ['', [Validators.required]],
      fullName: [''],
      nickname: [''],
      mobile: ['', [Validators.pattern(/^0[0-9]{10}$/)]],
      cancellationDate: ['', [Validators.required]],
      password: [''],
      department: ['', Validators.required],
      division: ['', Validators.required],
      sector: ['', Validators.required],
      controlCenter: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  closeForm() {
    this.close.emit();
  }

  onUserTypeChange(type: string) {
    this.selectedUserType = type;

    this.userNotFound = false;
    this.userFound = false;

    const passwordCtrl = this.form.get('password');

    if (type === 'newUser') {
      passwordCtrl?.setValidators([
        Validators.required,
        Validators.minLength(6),
      ]);
    } else {
      passwordCtrl?.clearValidators();
    }

    passwordCtrl?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);

      this.closeForm();
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }
}
