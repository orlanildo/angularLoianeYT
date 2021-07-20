import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Icourse } from 'src/app/models/iCurso';
import { delay, take, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly BASE_URL = environment.API

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Icourse[]>(`${this.BASE_URL}/courses`)
      .pipe(
        delay(500),
        tap(console.log)
      )
  }

  loadById(id){
    return this.http.get<Icourse>(`${this.BASE_URL}/courses/${id}`).pipe(take(1))
  }

  private create(course){
    // O take(1) é para já encerrar a requisição/Observable
    return this.http.post(`${this.BASE_URL}/courses`, course).pipe(take(1))
  }

  private update(course){
    return this.http.put(`${this.BASE_URL}/courses/${course.id}`, course).pipe(take(1))
  }

  delete(id){
    return this.http.delete(`${this.BASE_URL}/courses/${id}`).pipe(take(1))
  }

  save(course: Icourse){
    return course.id ? this.update(course) : this.create(course)
  }

}
