import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit{

  @Input() title?: string = "";
  @Input() description?: string = "";
  @Input() titleIcon?: string = "";

  public isExpansionOpened: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  public onHeaderClick(){
    this.isExpansionOpened = !this.isExpansionOpened;
  }

}
