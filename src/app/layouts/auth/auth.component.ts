import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { Router } from "@angular/router";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, InputTextModule, ButtonModule],
  templateUrl: "./auth.component.html",
  styleUrl: "./auth.component.css",
})
export class AuthComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    //Hard Email Validator
    //email: ["", [Validators.required, Validators.pattern(/^[0-9a-zA-Z_]+([@]{1})[0-9a-zA-Z_]+([.]{1})[a-zA-Z]+$/)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  get email() {
    return this.loginForm.controls["email"];
  }

  get password() {
    return this.loginForm.controls["password"];
  }

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email as string, password as string).subscribe(
      (response) => {
        console.log(`Email: ${response.email}, Password: ${response.password}`)
        this.router.navigate(["/"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
