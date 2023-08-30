import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';

//Services
import { TextEditorService } from './Service/text-editor.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  @ViewChild("content") content: ElementRef<HTMLElement>;

  @Input() placeholder: string = '';
  @Input() formControl: any;

  @Input() isBold?: boolean = false;
  @Input() isItalic?: boolean = false;
  @Input() isUnorderedList?: boolean = false;
  @Input() isOrderedList?: boolean = false;

  public text: string;

  @Output() onInputEvent = new EventEmitter();

  constructor(private textEditorService: TextEditorService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if(this.formControl.value != '') this.content.nativeElement.innerHTML = this.formControl.value;
    }, 1000);
  }

  makeBold(){
    this.textEditorService.setBold();
  }
  makeItalic(){
    this.textEditorService.setItalic();
  }
  makeUnorderedList(){
    this.textEditorService.setUnorderedList();
  }
  makeOrderedList(){
    this.textEditorService.setOrderedList();
  }

  public formIsDirty: boolean = false;
  modifyText(){
    this.formIsDirty = true;

    this.text = this.content.nativeElement.innerHTML;
    this.onInputEvent.emit(this.text);
  }

}
