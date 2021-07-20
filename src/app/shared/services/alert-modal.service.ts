import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(
    private modalService: BsModalService,
  ) { }

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number){
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent)
    bsModalRef.content.type = type
    bsModalRef.content.message = message

    if (dismissTimeout){
      setTimeout(() => bsModalRef.hide(), dismissTimeout)
    }
  }

  alertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER)
  }

  alertSuccess(message: string){
    this.showAlert(message, AlertTypes.SUCCESS, 1000)
  }

  alertWarning(message: string){
    this.showAlert(message, AlertTypes.WARNING)
  }

  alertInfo(message: string){
    this.showAlert(message, AlertTypes.INFO)
  }

  showConfirm(title: string, msgBody: string, nameBtnConfirm?: string, nameBtnDecline?: string){
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent)
    bsModalRef.content.title = title
    bsModalRef.content.msgBody = msgBody

    if(nameBtnConfirm) bsModalRef.content.nameBtnConfirm
    if(nameBtnDecline) bsModalRef.content.nameBtnDecline

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult

  }
}
