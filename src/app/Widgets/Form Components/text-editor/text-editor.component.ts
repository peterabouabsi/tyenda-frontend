import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';

//Services
import { TextEditorService } from './Service/text-editor.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {

  @ViewChild("content") content: ElementRef;

  @Input() placeholder: string = '';
  @Input() formControl: any;

  @Input() isBold?: boolean = false;
  @Input() isItalic?: boolean = false;
  @Input() isUnorderedList?: boolean = false;
  @Input() isOrderedList?: boolean = false;

  public onBold: boolean = false;
  public onItalic: boolean = false;
  public onUnorderedList: boolean = false;
  public onOrderedList: boolean = false;

  public text: string;

  @Output() onInputEvent = new EventEmitter();

  constructor(private textEditorService: TextEditorService) { }

  ngOnInit() {
  }

  makeBold(isActive: boolean = null){
    this.textEditorService.setBold();
    if(isActive != null) this.onBold = isActive;
  }
  makeItalic(isActive: boolean = null){
    this.textEditorService.setItalic();
    if(isActive != null) this.onItalic = isActive;
  }
  makeUnorderedList(isActive: boolean = null){
    this.textEditorService.setUnorderedList();
    if(isActive != null) this.onUnorderedList = isActive;
  }
  makeOrderedList(isActive: boolean = null){
    this.textEditorService.setOrderedList();
    if(isActive != null) this.onOrderedList = isActive;
  }

  public formIsDirty: boolean = false;
  modifyText(){
    this.formIsDirty = true;

    this.text = this.content.nativeElement.innerHTML;
    this.onInputEvent.emit(this.text);
  }

}
