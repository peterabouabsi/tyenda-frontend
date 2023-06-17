import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit{

  public toastrConfig: any = {
    success: false,
    danger: false,
    warning: false,

    title: '',
    message: '',
    display: false
  }

  public timeout: any;

  constructor(){
  }

  ngOnInit(): void {
  }

  public onSuccess(title: string, message: string, duration: number){
    this.close();
    this.toastrConfig.success = true;
    this.toastrConfig.danger = false;
    this.toastrConfig.warning = false;
    this.toastrConfig = {...this.toastrConfig, display: true, title: title, message: message};
    this.timeout = setTimeout(() => {
      this.close();
    }, (duration * 1000));
  }
  public onDanger(title: string, message: string, duration: number){
    this.close();
    this.toastrConfig.success = false;
    this.toastrConfig.danger = true;
    this.toastrConfig.warning = false;
    this.toastrConfig = {...this.toastrConfig, display: true, title: title, message: message};
    this.timeout = setTimeout(() => {
      this.close();
    }, (duration * 1000));
  }
  public onWarning(title: string, message: string, duration: number){
    this.close();
    this.toastrConfig.success = false;
    this.toastrConfig.danger = false;
    this.toastrConfig.warning = true;
    this.toastrConfig = {...this.toastrConfig, display: true, title: title, message: message};
    this.timeout = setTimeout(() => {
      this.close();
    }, (duration * 1000));
  }

  public close(){
    this.toastrConfig = {
      success: false,
      danger: false,
      warning: false,

      title: '',
      message: '',
      display: false
    }
    clearTimeout(this.timeout);
  }
}
