import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

//Services
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';
import { CustomerItemService } from './../../../../Services/customer-item.service';

//Views
import { CommentAdvancedView } from 'src/app/Shared/Models/Views/Comment/CommentAdvancedView.view';

//Forms
import { AddCommentForm } from 'src/app/Shared/Models/Forms/AddCommentForm.form';

@Component({
  selector: 'app-customer-item-comments',
  templateUrl: './customer-item-comments.component.html',
  styleUrls: ['./customer-item-comments.component.scss']
})
export class CustomerItemCommentsComponent implements OnInit{

  public comments: CommentAdvancedView[] = [];

  public commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', [])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public itemId: any,
              private globalService: GlobalService,
              private customerItemService: CustomerItemService) {
  }

  ngOnInit(): void {
    this.getItemComments();
  }

  private getItemComments(){
    this.globalService.getItemComments(this.itemId).subscribe((response: any) => {
      if(!response.error){
        this.comments = response;
      }
    });
  }

  public setValue(formControlName: string, value: any){
    this.commentForm.get(formControlName).setValue(value);
  }

  public deleteComment(commentId: string){
    this.globalService.deleteComment(commentId).subscribe((response: any) => {
      if(!response.error){
        this.getItemComments();
      }
    });
  }

  @HostListener('document: keyup.enter')
  public addComment(){
    if(this.commentForm.get('comment').value){
      let form: AddCommentForm = {
        itemId: this.itemId,
        comment: this.commentForm.get('comment').value
      }
      this.customerItemService.addComment(form).subscribe((response: any) => {
        if(!response.error){
          this.commentForm.reset();
          this.getItemComments();
        }
      })
    }
  }

}
