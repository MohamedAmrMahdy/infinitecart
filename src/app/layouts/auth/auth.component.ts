import { Component, inject } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { Router } from "@angular/router";
import { AuthStore } from "../../stores/auth.store";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [ ReactiveFormsModule, CardModule, InputTextModule, ButtonModule],
  providers: [AuthStore, AuthService],
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.css",
})
export class AuthComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  readonly authStore = inject(AuthStore);
  isLogin:boolean = true;

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = this.loginForm?.controls["password"].value || '';
      const confirmPassword = control.value;
      return (password && confirmPassword && password !== confirmPassword) ? {passwordmismatch: {value: control.value}} : null;
    };
  }

  loginForm = this.fb.group({
    //Hard Email Validator
    //email: ["", [Validators.required, Validators.pattern(/^[0-9a-zA-Z_]+([@]{1})[0-9a-zA-Z_]+([.]{1})[a-zA-Z]+$/)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    name: ["", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["", [Validators.required, Validators.minLength(6), this.passwordMatchValidator()]],
  });

  get email() {
    return this.loginForm.controls["email"];
  }

  get password() {
    return this.loginForm.controls["password"];
  }

  get name() {
    return this.loginForm.controls["name"];
  }

  get confirmPassword() {
    return this.loginForm.controls["confirmPassword"];
  }

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email as string, password as string).subscribe({
      next: response => {
        this.authStore.login(response.user, response.accessToken)
        this.router.navigate(["/"]);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  registerUser() {
    const { name, email, password } = this.loginForm.value;
    this.authService.register(name as string, email as string, password as string).subscribe({
      next: response => {
        this.authStore.login(response.user, response.accessToken)
        this.router.navigate(["/"]);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  toggleLogin(){
    this.isLogin = !this.isLogin;
  }

}
