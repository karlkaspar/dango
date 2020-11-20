// BASE COMPONENT CONTAINS METHODS AND OTHER MAGIC, WHICH CAN EASILY BE USED IN OTHER COMPONENTS
import { OnDestroy, Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppInjector } from 'src/app/app.injector.service';
import { UserService } from '../../_services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Location } from '@angular/common';
import { Logs } from 'src/app/_domain';
import { AppService } from '../../_services/app.service';

@Directive({
  selector: 'app-base',
})
export class BaseComponent implements OnDestroy {

  public subscriptions: Subscription[] = [];
  protected routingLocation: Location;
  protected userService: UserService;
  protected modalService: BsModalService;
  protected appService: AppService
  modalRef: BsModalRef;

  constructor() {
    try {
      // INJECTOR ALLOWS OTHER COMPONENTS WHICH EXTEND BASE COMPONENT TO USE THEM
      const injector = AppInjector.getInjector();
      this.routingLocation = injector.get(Location);
      this.userService = injector.get(UserService);
      this.modalService = injector.get(BsModalService);
      this.appService = injector.get(AppService);
    } catch (error) {
      console.error('Failed initializing dependencies', error);
    }
  }

  goBack() {
    this.routingLocation.back();
  }

  openModal(modal: any): void {
    this.modalRef = this.modalService.show(modal, Object.assign({}, { class: 'modal-lg' }));
  }

  closeModal() {
    this.modalRef.hide();
  }

  ngOnDestroy(): void {
    this.unsubscribeAllFromList();
  }

  addSubscriptionToList(subscription: any) {
    this.subscriptions.push(subscription);
  }

  unsubscribeAllFromList() {
    this.subscriptions.forEach(subscription => {
      if (subscription !== undefined) {
        subscription.unsubscribe();
      }
    });
  }
}
