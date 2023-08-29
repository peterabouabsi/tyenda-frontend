import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//Views
import { CommentAdvancedView } from 'src/app/Shared/Models/Views/Comment/CommentAdvancedView.view';

//Environments
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit{

  /* -------- Global variables */
  public fileBaseUrl: string = environment.fileBaseUrl;
  /* Global variables ----------- */

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
