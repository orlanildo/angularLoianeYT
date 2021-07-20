import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, empty, Observable, of, Subject } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import { Icourse } from 'src/app/models/iCurso';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { CoursesService } from '../services/courses.service';
import { Courses2Service } from '../services/courses2.service';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss'],
  preserveWhitespaces: true
})
export class ListCoursesComponent implements OnInit {

  @ViewChild('deleteModal', { static: true }) deleteModal
  courses$: Observable<Icourse[]>
  error$ = new Subject<boolean>()
  deleteModalRef: BsModalRef
  selectedCourse: Icourse
  
  constructor(
    private courseService: Courses2Service,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.onRefresh()
  }

  onRefresh(){
    this.courses$ = this.courseService.list().pipe(
      // Ou com o segundo parametro do subscribe
      catchError(error => {
        console.error(error)
        //this.error$.next(true)
        this.handleError()
        return of() // ou empty()
      })
    )
  }

  handleError(){
    this.alertService.alertDanger('Erro ao carregar cursos. Tente novamente mais tarde.')
    // this.bsModalRef = this.modalService.show(AlertModalComponent)
    // this.bsModalRef.content.type = 'danger'
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.'
  }

  onEdit(idCourse: number){
    this.router.navigate(['edit', idCourse], { relativeTo: this.route })
  }

  onDelete(course: Icourse){
    //this.selectedCourse = course
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});

    const result$ = this.alertService.showConfirm(
      'Confirmação', 'Certeza de que deseja remover esse curso ?' )

    result$.asObservable().pipe(take(1),
      switchMap(result => result ? this.courseService.delete(course.id) : EMPTY))
      .subscribe(success => this.onRefresh(),
        error => this.alertService.alertDanger('Erro ao excluir curso. Tente novamente mais tarde.'), 
        () => console.log('save completed')
      )
  }

  onConfirmDelete(){
    this.courseService.delete(this.selectedCourse.id).subscribe(
      success => {
        this.onRefresh()
        // this.modal.alertSuccess(msgSuccess)
        // this.location.back()
      },
      error => {
        this.alertService.alertDanger('Erro ao excluir curso. Tente novamente mais tarde.')
        //this.modal.alertDanger(msgError),
      }, 
      () => console.log('save completed')
    )
    this.onDeclineDelete()
  }

  onDeclineDelete(){
    this.deleteModalRef.hide()
  }


}

