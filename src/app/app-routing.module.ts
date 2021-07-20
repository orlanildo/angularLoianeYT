import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'reactive-search' },
  { path: 'courses', loadChildren: './courses/courses.module#CoursesModule' },
  { path: 'rxjs-poc', loadChildren: './unsubscribe-rxjs/unsubscribe-rxjs.module#UnsubscribeRxjsModule' },
  { path: 'unpload', loadChildren: './unpload-file/unpload-file.module#UnploadFileModule' },
  { path: 'reactive-search', loadChildren: './reactive-search/reactive-search.module#ReactiveSearchModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
