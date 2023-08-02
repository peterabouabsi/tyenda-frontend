import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Environment
import { environment } from 'src/environments/environments';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Config
import { ButtonConfig } from 'src/app/Widgets/Button Components/button-loader/ButtonConfig.form';

//Components
import { ButtonLoaderComponent } from 'src/app/Widgets/Button Components/button-loader/button-loader.component';
import { ToastrComponent } from 'src/app/Widgets/Other Components/toastr/toastr.component';

//Forms
import { LoginForm } from 'src/app/Shared/Models/Forms/LoginForm.form';
import { LoginGoogleForm } from 'src/app/Shared/Models/Forms/LoginGoogleForm.form';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('toastr') toastrRef: ToastrComponent; public viewToastr: boolean = true;
  @ViewChild('loginButton') loginButton: ButtonLoaderComponent; public buttonConfig: ButtonConfig = { isBlue: true };

  public loginForm: FormGroup = new FormGroup({
    usernameEmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router,
    private globalService: GlobalService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.initGoogleSignIn();
  }

  /* -------------------- init and login (if yes) using google account ----------------------- */
  private initGoogleSignIn() {
    const clientId = environment.googleOAuthClientId;
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: clientId,
      callback: this.loginWithGoogle.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,

    });
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("google-signin-button"),
      { size: "large", width: 100, type: 'icon', shape: 'circle', theme: 'outline' }
    );
    // @ts-ignore
    google.accounts.id.prompt();

  }
  private async loginWithGoogle(response: any) {
    let loginGoogleForm: LoginGoogleForm = {
      credential: response.credential
    }
    await this.authenticationService.loginWithGoogle(loginGoogleForm).subscribe((response: any) => {
      if (response.error) {
        this.toastrRef.onDanger('Login', response.message, 5);
      } else {
        //This means you received your tokens and ready to move on
        this.globalService.setStorage(Constants.STORAGE_SESSION, response);
        this.globalService.getAccountRole().subscribe((response: any) => {
          if (!response.error) {
            this.router.navigate(['/application/' + response.role.toLowerCase()]);
          }
        });
      }

    });
  }
  /* -------------------- init and login (if yes) using google account ----------------------- */

  public setValue(controleName: string, value: string) {
    this.loginForm.get(controleName).setValue(value);
  }

  @HostListener('document: keyup.enter')
  public login() {
    this.loginButton.onClick(() => {
      if (this.loginForm.valid) {
        let loginFrom: LoginForm = {
          usernameOrEmail: this.loginForm.get('usernameEmail').value,
          password: this.loginForm.get('password').value
        }

        this.authenticationService.login(loginFrom).subscribe((response: any) => {
          this.loginButton.loading = false
          if (response.error) {
            this.toastrRef.onDanger('Login', response.message, 5);
          } else {
            //This means you received your tokens and ready to move on
            if (response.isActive == undefined) {
              this.globalService.setStorage(Constants.STORAGE_SESSION, response);
              this.globalService.getAccountRole().subscribe((response: any) => {
                if (!response.error) {
                  this.router.navigate(['/application/' + response.role.toLowerCase()]);
                }
              });
              //This means the account is not activated yet
            } else {
              this.router.navigate([Constants.AUTH_MAIN_ROUTE + 'email-activation'], { queryParams: { email: response.email } });
            }
          }
        });

      } else {
        this.loginButton.loading = false;
        this.markFormAsDirty();
      }
    });
  }

  public markFormAsDirty() {
    Object.keys(this.loginForm.getRawValue()).forEach(formControlName => {
      this.loginForm.get(formControlName).markAsDirty();
    });
  }

  public forgetPassword() {
    this.router.navigate([Constants.AUTH_MAIN_ROUTE + 'forget-password']);
  }
  public signup(path: string) {
    this.router.navigate([Constants.AUTH_MAIN_ROUTE + 'signup/' + path]);
  }
}
