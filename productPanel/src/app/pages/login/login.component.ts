import { Component,OnInit } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule,RouterLink,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup
  UserName: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      UserName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return; 
    }

    const { UserName, password } = this.loginForm.value;

    this.authService.login(UserName, password).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/panel']); 
        } else {
          this.errorMessage = response.message; 
        }
      },
      error: (err) => {
        this.errorMessage = 'خطای سرور!';
        console.error(err);
      },
    });
  }
}

