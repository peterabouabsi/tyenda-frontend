import { GlobalService } from '../Services/Global/global.service';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngRolePermission]'
})
export class RolePermissionDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private globalService: GlobalService
  ) {}

  @Input() set ngRolePermission(role: string) {
    this.getUserRole(role);
  }

  private getUserRole(role: string) {
    this.globalService.getAccountRole().subscribe((response: any) => {
      if (!response.error) {
        // Clear the view container
        this.viewContainer.clear();

        // Add the content to the view container if the user's role is allowed
        if (response.role === role) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
    });
  }
}
