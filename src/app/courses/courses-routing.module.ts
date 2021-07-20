import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormCourseComponent } from './form-course/form-course.component';
import { CourseResolverGuard } from './guards/course-resolver.guard';

import { ListCoursesComponent } from './list-course/list-courses.component';

const routes: Routes = [
  { path: '', component: ListCoursesComponent },
  { path: 'new', component: FormCourseComponent, resolve: { course: CourseResolverGuard } },
  { path: 'edit/:id', component: FormCourseComponent, resolve: { course: CourseResolverGuard } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
