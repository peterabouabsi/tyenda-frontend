import { Component, ElementRef, Input, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

//Config
import { StepConfig } from 'src/app/Widgets/Other Components/stepper/StepConfig.form';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit{

  @Input() public steps: number;
  @Input() public activeStep: number;
  @Input() public stepsConfig?: StepConfig[] = [];

  public stepsList: any[] = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.generateStepsList();
  }

  private generateStepsList(){
    for(let step = 1; step <= this.steps; step++){
      this.stepsList.push({
        note: this.stepsConfig[step-1].note,
        step: step
      });
    }
  }

  @ViewChildren('noteContainer') noteContainerRefs: QueryList<ElementRef<HTMLElement>>
  public onStepHover(step: number){
    this.noteContainerRefs.get(step-1).nativeElement.style.display = 'flex';
  }
  public onStepLeave(step: number){
    this.noteContainerRefs.get(step-1).nativeElement.style.display = 'none';
  }
  public onStepClick(step: number){
    if(step < this.activeStep || this.stepsConfig[step-1].visited){
      this.router.navigate([this.stepsConfig[step-1].route]);
    }
  }

}
