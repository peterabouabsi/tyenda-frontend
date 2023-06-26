import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent implements OnInit {

  @Input() data: any[] = [];
  @Input() placeholder: string = '';
  @Input() formControl: any = null;

  @Output() onSelectEvent = new EventEmitter();

  public isFormControlArray: boolean = false;

  constructor(private globalService: GlobalService) {
  }

  ngOnInit(): void {
    if (this.formControl.value) this.selectedOption = this.formControl.value;
    if (Array.isArray(this.formControl.value)) this.isFormControlArray = true;
  }

  //Select option
  public selectedOption: any;
  public setOption(option: any) {
    this.selectedOption = option;
    if (Array.isArray(this.formControl.value)) {
      this.globalService.checkExistancy(this.formControl.value, { id: this.selectedOption.id }, (exist: boolean) => {
        if (!exist) {
          this.formControl.value.push(this.selectedOption);
        }
      });
    } else {
      this.formControl.setValue(this.selectedOption);
      this.onSelectEvent.emit(this.selectedOption);
    }
  }

  //Open-Close select field
  public isSelectFieldOpened: boolean = false;
  public openCloseSelectField() {
    this.isSelectFieldOpened = !this.isSelectFieldOpened;
  }

  //Close select field
  public closeSelectField() {
    if (!this.formControl.valid) this.formControl.markAsDirty();
    this.isSelectFieldOpened = false;
  }
}
