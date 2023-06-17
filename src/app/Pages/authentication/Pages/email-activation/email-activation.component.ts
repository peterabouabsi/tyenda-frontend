import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//Services
import { AuthenticationService } from '../../Services/authentication.service';

//Forms
import { SendActivationEmailForm } from 'src/app/Shared/Models/Forms/SendActivationEmailForm.form';
import { ToastrComponent } from 'src/app/Widgets/Other Components/toastr/toastr.component';

@Component({
  selector: 'app-email-activation',
  templateUrl: './email-activation.component.html',
  styleUrls: ['./email-activation.component.scss']
})
export class EmailActivationComponent implements OnInit{

  @ViewChild('toastr') toastrRef: ToastrComponent; public viewToastr: boolean = false;

  public email: string = "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.getActivationEmail();
  }

  private getActivationEmail(){
    this.email = this.route.snapshot.queryParams['email'];
    if(!this.email || this.email == ''){
      this.router.navigate(['/authentication/login']);
    }
  }

  public loading: boolean = false;
  public sendActivationEmail(){
    this.loading = true;
    let sendActivationEmailForm: SendActivationEmailForm = {
      email: this.email
    };
    this.authenticationService.sendActivationEmail(sendActivationEmailForm).subscribe((response: any) => {
      this.loading = false;
      this.viewToastr = true;
      if(response.error){
        this.toastrRef.onDanger('Email Confirmation', response.message, 5);
      }else{
        this.toastrRef.onSuccess('Email Confirmation', response.message, 5);
      }
    });
  }

  public login(){
    this.router.navigate(['/authentication/login']);
  }
}
