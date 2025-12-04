import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgStyle, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private router = inject(Router);
  private fb = inject(FormBuilder);
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  createForm() {}
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    } else {
      console.log(this.loginForm.value);
      this.router.navigate(['/home']);
    }
  }
}

//نصايح شات
//1- استخدم ان لكل عنصر ف الفورم نعمل فنكشن خاص بيه زي
// get userName() {
//   return this.loginForm.get('userName');
// }
// get password() {
//   return this.loginForm.get('password');
// }
//بحيث يسهل الدنيا تبقي كده
// @if(userName?.invalid && userName?.touched) {
//   <small class="err-msg">Please enter valid userName or Email.</small>
// }
//تاني حاجه ابقي فعل سهولة الاستخدام

// onSubmit() {
//   if (this.loginForm.invalid) {
//     this.loginForm.markAllAsTouched();
//     return;
//   }
//   console.log(this.loginForm.value);
// }
