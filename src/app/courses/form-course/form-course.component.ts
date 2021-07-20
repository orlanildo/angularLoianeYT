import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertModalService } from 'src/app/shared/services/alert-modal.service';
import { CoursesService } from '../services/courses.service';
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router';
import { Icourse } from 'src/app/models/iCurso';

@Component({
  selector: 'app-form-course',
  templateUrl: './form-course.component.html',
  styles: []
})
export class FormCourseComponent implements OnInit {

  form: FormGroup
  flagSubmittedForm = false

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.route.params.subscribe((params: any) => {
    //   const idCourse = params['id'] // Ou params.id
    //   const course$ = this.courseService.loadById(idCourse)
    //   course$.subscribe(course => {
    //     this.updateForm(course)
    //   })
    // })

    // subscribe no route.params o angular gerencia, ou seja, não precisa se desinscrever
    // this.route.params.pipe(
    //     map((params: any) => params['id']),
    //     // O switchMap cancela as req anteriores, e apenas devolve o valor do ultimo "pedido"
    //     switchMap(id => this.courseService.loadById(id))
    //   ) // Esse subscribe é do loadById, graças ao switchMap
    //   .subscribe(course => this.updateForm(course))

    // Dica: concatMap -> A ordem da requisição importa
    // mergeMap -> A ordem não importa
    // exhaustMap -> casos de login

    const course: Icourse = this.route.snapshot.data['course']

    this.form = this.fb.group({
      id: [course.id],
      name: [course.name, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    })
  }

  // updateForm(course: Icourse){
  //   this.form.patchValue({
  //     id: course.id,
  //     name: course.name
  //   })
  // }

  hasError(nameField: string){
    return this.form.get(nameField).errors
  }

  onSubmit(){
    this.flagSubmittedForm = true
    if(this.form.valid){
      let msgSuccess = 'Curso criado com sucesso!'
      let msgError = 'Erro ao criar curso, tente novamente mais tarde!'

      if (this.form.value.id) {
        msgSuccess = 'Curso atualizado com sucesso!'
        msgError = 'Erro ao atualizar curso, tente novamente mais tarde!'
      }

      this.courseService.save(this.form.value).subscribe(
        success => {
          this.modal.alertSuccess(msgSuccess)
          this.location.back()
        },
        error => this.modal.alertDanger(msgError),
        () => console.log('save completed')
      )
    }
  }

  onCancel(){
    this.flagSubmittedForm = false
    this.form.reset()
  }

}


// O take(1) no serviço já se desinscreve do observable e ensera a req
//   this.courseService.update(this.form.value).subscribe(
//     success => {
//       this.modal.alertSuccess('Curso atualizado com sucesso!')
//       this.location.back()
//     },
//     error=> this.modal.alertDanger('Erro a atualizar curso, tente novamente mais tarde!'),
//     () => console.log('update completed'))
// }else{
//   this.courseService.create(this.form.value).subscribe(
//     success => {
//       this.modal.alertSuccess('Curso criado com sucesso!')
//       this.location.back()
//     },
//     error=> this.modal.alertDanger('Erro ao criar curso, tente novamente mais tarde!'),
//     () => console.log('post completed'))