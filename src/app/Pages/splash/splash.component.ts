import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { GlobalService } from './../../Shared/Services/Global/global.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit{

  constructor(private router: Router,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isAuthenticated();
    }, 3000)
  }

  public isAuthenticated(){
    this.globalService.isAuthenticated().then((data) => {
      if(data.isAuth){
        this.router.navigate(['/application/'+data.role.toLowerCase()]);
      }else{
        this.router.navigate(['/authentication']);
      }
    });
  }
}
