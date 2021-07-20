import { Component, Input, OnInit } from '@angular/core';
import { BsComponentRef } from 'ngx-bootstrap/component-loader';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styles: []
})
export class ConfirmModalComponent implements OnInit {

  confirmResult: Subject<boolean> // emite valores, onde escultamos com um observable

  @Input() title: string
  @Input() msgBody: string
  @Input() nameBtnConfirm = 'Sim'
  @Input() nameBtnDecline = 'Cancelar'


  constructor(
    private bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.confirmResult = new Subject()
  }

  onConfirm(){
    this.confirmAndClose(true)
  }

  onClose(){
    this.confirmAndClose(false)
  }

  private confirmAndClose(value: boolean){
    // Emitindo o valor true atravez do next para quem quiser escultar 
    this.confirmResult.next(value) 
    this.bsModalRef.hide()
  }

}
