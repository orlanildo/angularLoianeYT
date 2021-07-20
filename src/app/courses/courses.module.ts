import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { ListCoursesComponent } from './list-course/list-courses.component';
import { FormCourseComponent } from './form-course/form-course.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListCoursesComponent, FormCourseComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CoursesModule { }
