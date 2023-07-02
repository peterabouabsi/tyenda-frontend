import { ChangeDetectorRef, Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Config
import { StepConfig } from 'src/app/Widgets/Other Components/stepper/StepConfig.form';
import { ButtonConfig } from 'src/app/Widgets/Button Components/button-loader/ButtonConfig.form';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { AuthenticationService } from '../../Services/authentication.service';

//Forms
import { StoreSignupForm } from 'src/app/Shared/Models/Forms/StoreSignupForm.form';

//Views
import { BasicCategoryView } from 'src/app/Shared/Models/Views/Category/BasicCategoryView.view';

//Components
import { ButtonLoaderComponent } from 'src/app/Widgets/Button Components/button-loader/button-loader.component';
import { ToastrComponent } from 'src/app/Widgets/Other Components/toastr/toastr.component';

@Component({
  selector: 'app-store-signup',
  templateUrl: './store-signup.component.html',
  styleUrls: ['./store-signup.component.scss']
})
export class StoreSignupComponent implements OnInit {

  @ViewChild('toastr') toastrRef: ToastrComponent; public viewToastr: boolean = true;

  //Configurations
  public stepperConfig: StepConfig[] = [
    { note: 'Account info', route: '/authentication/signup/store/account-info', visited: true },
    { note: 'Store info', route: '/authentication/signup/store/store-info', visited: false },
    { note: 'Branch', route: '/authentication/signup/store/store-branch', visited: false },
    { note: 'Category', route: '/authentication/signup/store/store-category', visited: false }
  ]
  public buttonConfig: ButtonConfig = { isBlue: true, isStepper: true }

  constructor(private cdr: ChangeDetectorRef,
              private router: Router,
              private globalService: GlobalService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.prepareStoreData();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.deleteStoreData();
  }

  //Show reload alert when refreshing the page
  @HostListener('window: beforeunload', ['$event'])
  private onLoadResetData(event: any){
    this.globalService.showReloadAlert('Are you sure you want to leave? You may lose unsaved changes.', event);
  }
  //------------------------------------------------------------------------------

  //Prepare/Delete/Reset store data from localstorage (contains the input data per step)
  private resetData(){
    this.activeStep = 1;
    this.router.navigate([this.stepperConfig[this.activeStep - 1].route]);
  }
  private prepareStoreData() {
    this.resetData();
    this.globalService.setStorage(Constants.STORAGE_STORE_DATA, {});
  }
  private deleteStoreData() {
    this.globalService.deleteStorage(Constants.STORAGE_STORE_DATA);
  }
  //------------------------------------------------------------------------------

  //move to the next step or signup
  public nextOrSignup() {
    if ((this.activeStep + 1) <= this.steps) {
      this.next();
    } else {
      this.signup();
    }
  }
  private next() {
    if ((this.activeStep + 1) == this.steps) {
      this.buttonConfig.isStepper = false
    };
    this.activeStep++;
    this.buttonConfig.isStepper = true;
    this.stepperConfig[this.activeStep - 1].visited = true;
    this.router.navigate([this.stepperConfig[this.activeStep - 1].route]);
  }

  @ViewChild('signupButton') signupButton: ButtonLoaderComponent;
  private signup() {
    this.signupButton.onClick(() => {
      let storeData = this.globalService.getStorage(Constants.STORAGE_STORE_DATA);

      let storeSignupForm: StoreSignupForm = {
        email: storeData.email? storeData.email : '',
        phoneNumber: storeData.phoneNumber? storeData.phoneNumber : '',
        username: storeData.username? storeData.username : '',
        password: storeData.password? storeData.password : '',
        storeName: storeData.storeName? storeData.storeName : '',
        ownerName: storeData.ownerName? storeData.ownerName : '',
        ownerEmail: storeData.ownerEmail? storeData.ownerEmail : '',
        website: storeData.website? storeData.website : '',
        description: storeData.description? storeData.description : '',
        branches: storeData.branches? storeData.branches.map(branch => {return {cityId: branch.city.id, addressDetails: branch.addressDetails}}) : [],
        categoryIds: storeData.categories? storeData.categories.map((category: BasicCategoryView) => category.id) : []
      };

      this.globalService.checkFormValidity(storeSignupForm, ['email', 'phoneNumber', 'username', 'password', 'storeName', 'ownerName', 'ownerEmail' ,'description', 'branches'], (valid: boolean) => {
        if(valid){
          this.authenticationService.signup('/Account/Store/Signup()', storeSignupForm).subscribe((response: any) => {
            setTimeout(() => {this.signupButton.loading = false}, 1500);
            if(!response.error){
              this.router.navigate([Constants.AUTH_MAIN_ROUTE+'email-activation'], {queryParams: {email: storeData.email}});
            }
          });
        }else{
          this.signupButton.loading = false;
          this.toastrRef.onDanger('Store Signup', 'Required fields missing', 5);
        }
      });

    });

  }
  //------------------------------------------------------------------------------


  public steps: number = 4;
  public activeStep: number = 0;
  public setActiveStep(component: any) {
    this.activeStep = component.step;
  }

  public login() {
    this.router.navigate([Constants.AUTH_MAIN_ROUTE+'login']);
  }

}
