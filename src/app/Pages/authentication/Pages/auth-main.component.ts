import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

@Component({
  selector: 'app-auth-main',
  templateUrl: './auth-main.component.html',
  styleUrls: ['./auth-main.component.scss']
})
export class AuthMainComponent implements OnInit{

  constructor(private router: Router,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
  }

  public isAuthenticated(){
    this.globalService.isAuthenticated().then((data) => {
      if(data.isAuth){
        this.router.navigate(['/application/'+data.role.toLowerCase()]);
      }
    });
  }
}
