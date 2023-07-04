import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//Views
import { CommentAdvancedView } from 'src/app/Shared/Models/Views/Comment/CommentAdvancedView.view';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit{

  @Input() data: CommentAdvancedView;
  @Output() onDeleteEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  public deleteComment(commentId: string){
    this.onDeleteEvent.emit(commentId);
  }

}
