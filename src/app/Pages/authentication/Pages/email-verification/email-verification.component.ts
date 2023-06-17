import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//Services
import { AuthenticationService } from '../../Services/authentication.service';

//Forms
import { ActivateAccountForm } from './../../../../Shared/Models/Forms/ActivateAccountForm.form';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit{

  public token: string = "";
  public isTokenValid: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.activateAccount();
  }

  private activateAccount(){
    this.token = this.route.snapshot.queryParams['token'];
    if(!this.token || this.token == ''){
      this.router.navigate(['/authentication/login']);
    }else{
      let activateAccountForm: ActivateAccountForm = {
        token: this.token
      };
      this.authenticationService.activateAccount(activateAccountForm).subscribe((response: any) => {
        if(response.error){
          this.isTokenValid = false;
        }else{
          this.isTokenValid = true;
        }
      });
    }
  }

}
