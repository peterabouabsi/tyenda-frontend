import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { Component, ElementRef, ViewChild, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  @Input() scrollAmount?: number = 100;

  public maxPosition: number;
  public minPosition: number;

  public isTouchableDevice: boolean = false;
  public showRightArrow: boolean;
  public showLeftArrow: boolean;

  @ViewChild('content') contentRef: ElementRef<HTMLElement>;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private globalService: GlobalService) {
  }

  ngAfterViewInit(): void {
    this.generateMinMaxPositions();
    this.checkTouchableDevice();
    this.changeDetectorRef.detectChanges();
  }

  private checkTouchableDevice(){
    this.isTouchableDevice = this.globalService.checkTouchDevice();
    if(this.isTouchableDevice){
      this.showRightArrow = false;
    }else{
      this.showRightArrow = true;
    }
    this.showLeftArrow = false;

    if(this.maxPosition == 0){
      this.showRightArrow = false;
    }
  }

  private generateMinMaxPositions(){
    this.maxPosition = Math.floor(this.contentRef.nativeElement.scrollWidth - this.contentRef.nativeElement.offsetWidth);
    this.minPosition = 0;
  }

  public onLeftClick(){
    this.showRightArrow = true;

    this.contentRef.nativeElement.scrollLeft = this.contentRef.nativeElement.scrollLeft - this.scrollAmount

    if(Math.floor(this.contentRef.nativeElement.scrollLeft - this.scrollAmount) <= this.minPosition){
      this.showLeftArrow = false;
    }
  }

  public onRightClick(){
    this.showLeftArrow = true;

    this.contentRef.nativeElement.scrollLeft = this.contentRef.nativeElement.scrollLeft + this.scrollAmount;

    if(Math.ceil(this.contentRef.nativeElement.scrollLeft + this.scrollAmount) >= this.maxPosition){
      this.showRightArrow = false;
    }
  }

}
