import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//Environment
import { environment } from 'src/environments/environments';

//Constants
import { Constants } from 'src/app/Shared/Models/constants.model';

//Views
import { ItemAdvancedView } from 'src/app/Shared/Models/Views/Item/ItemAdvancedView.view';
import { CommentAdvancedView } from 'src/app/Shared/Models/Views/Comment/CommentAdvancedView.view';

//Services
import { CustomerItemService } from './../../Services/customer-item.service';
import { GlobalService } from 'src/app/Shared/Services/Global/global.service';

//Forms
import { RateItemForm } from 'src/app/Shared/Models/Forms/RateItemForm.form';
import { AddRemoveCartForm } from 'src/app/Shared/Models/Forms/AddRemoveCartForm.form';
import { LikeItemForm } from 'src/app/Shared/Models/Forms/LikeItemForm.form';
import { AddCommentForm } from 'src/app/Shared/Models/Forms/AddCommentForm.form';

@Component({
  selector: 'app-customer-item-description',
  templateUrl: './customer-item-description.component.html',
  styleUrls: ['./customer-item-description.component.scss']
})
export class CustomerItemDescriptionComponent implements OnInit {

  public fileBaseUrl: string = environment.fileBaseUrl;

  public item: ItemAdvancedView;
  public comments: CommentAdvancedView[] = [];

  public commentForm: FormGroup = new FormGroup({ comment: new FormControl('', []) });

  constructor(private router: Router,
              private route: ActivatedRoute,
              private globalService: GlobalService,
              private customerItemService: CustomerItemService) {
  }

  ngOnInit(): void {
    this.getItemComments();
  }

  private getItemComments() {
    let itemId = this.route.snapshot.parent.params['itemId'];
    this.globalService.getItemComments(itemId).subscribe((response: any) => {
      if (!response.error) {
        this.comments = response;
      }
    });
  }

  public onRateItem(rate: number) {
    let form: RateItemForm = {
      itemId: this.item.id,
      rate: rate
    }
    this.customerItemService.rateItem(form).subscribe((response: any) => {
      if (!response.error) {
        this.item = { ...this.item, myRate: response.myRate, rate: response.itemRate, ratersCount: response.ratersCount }
      }
    });
  }

  public addRemoveCart() {
    let form: AddRemoveCartForm = {
      itemId: this.item.id
    }
    this.customerItemService.addRemoveCart(form).subscribe((response: any) => {
      if (!response.error) {
        this.item = { ...this.item, isAddedToCart: response.isAddedToCart }
      }
    });
  }

  public likeDislike() {
    let form: LikeItemForm = {
      itemId: this.item.id
    }
    this.customerItemService.likeDislike(form).subscribe((response: any) => {
      if (!response.error) {
        this.item = { ...this.item, isLiked: response.isItemLiked }
        if (this.item.isLiked) this.item.countLikes++;
        else this.item.countLikes--;
      }
    });
  }

  public activeImageIndex = 0;
  public displaySelectedImage(image: any, index: number) {
    this.item.displayedImage = image;
    this.activeImageIndex = index;
  }

  public order() {
    this.router.navigate([Constants.APP_MAIN_ROUTE_CUSTOMER + '/request-order/' + this.item.id]);
  }

  public isCommentSectionOpened: boolean = false;
  public openCommentsSection() {
    this.isCommentSectionOpened = !this.isCommentSectionOpened;
  }

  public setValue(formControlName: string, value: any) {
    this.commentForm.get(formControlName).setValue(value);
  }

  public deleteComment(commentId: string) {
    this.globalService.deleteComment(commentId).subscribe((response: any) => {
      if (!response.error) {
        this.getItemComments();
      }
    });
  }

  @HostListener('document: keyup.enter')
  public addComment() {
    if (this.commentForm.get('comment').value) {
      let form: AddCommentForm = {
        itemId: this.item.id,
        comment: this.commentForm.get('comment').value
      }
      this.customerItemService.addComment(form).subscribe((response: any) => {
        if (!response.error) {
          this.commentForm.reset();
          this.getItemComments();
        }
      })
    }
  }

}
