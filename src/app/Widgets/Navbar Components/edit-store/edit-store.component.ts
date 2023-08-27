import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.scss']
})
export class EditStoreComponent implements OnInit{

  constructor(private dialogRef: MatDialogRef<EditStoreComponent>,
              private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getProfile();
  }

  private getProfile(){
    this.globalService.getProfile().subscribe((response: any) => {
      if(!response.error){
        console.log(response);
      }
    })
  }

}
