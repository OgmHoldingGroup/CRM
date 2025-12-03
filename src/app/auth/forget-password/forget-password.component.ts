import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
export function passwordMatchValidator(
  form: AbstractControl
): ValidationErrors | null {
  const fg = form as FormGroup;
  const pass = fg.get('password')?.value;
  const confirm = fg.get('confirmPassword')?.value;

  return pass === confirm ? null : { mismatch: true };
}
@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, NgStyle],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  ngOnInit(): void {
    this.forgetPassword = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(10),
          ],
        ],
      },
      { validators: passwordMatchValidator }
    );
  }
  forgetPassword!: FormGroup;

  private fb = inject(FormBuilder);

  onSubmit() {
    if (this.forgetPassword.invalid) {
      this.forgetPassword.markAllAsTouched();
      return;
    }
    console.log(this.forgetPassword.value);
  }
}
