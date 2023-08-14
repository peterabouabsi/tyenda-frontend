import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextEditorService {

  constructor() { }

  setBold(){
    document.execCommand('bold');
  }

  setItalic(){
    document.execCommand('italic');
  }

  setUnderline(){
    document.execCommand('underline');
  }

  setUnorderedList(){
    document.execCommand('insertUnorderedList');
  }

  setOrderedList(){
    document.execCommand('insertOrderedList');
  }

  //Add options as you want
  //...

}
