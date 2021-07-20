import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Icourse } from 'src/app/models/iCurso';
import { CoursesService } from '../services/courses.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolverGuard implements Resolve<Icourse> {

  constructor(private coursesService: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Icourse> {
      if(route.params && route.params['id']){
        return this.coursesService.loadById(route.params['id'])
      }

      // O of pode receber um objt e retorna um observable desse tipo
      return of({ id: null, name: null})
  }
  
}
