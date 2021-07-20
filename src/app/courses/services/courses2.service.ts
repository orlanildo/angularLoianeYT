import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icourse } from 'src/app/models/iCurso';
import { CrudService } from 'src/app/shared/services/crud-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Courses2Service extends CrudService<Icourse>{

  constructor(
    protected http: HttpClient,
  ) {
    super(http, `${environment.API}/courses`);
  }
}
