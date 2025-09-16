import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {SignInRequest} from '../../model/requests/sign-in.request';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    HttpClientModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService : AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  submitted = false;

  ngOnInit(): void {

  }
  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';

    this.authService.signIn(new SignInRequest(username, password));
    this.submitted = true;
  }
}
