import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnploadFileComponent } from './unpload-file/unpload-file.component';

const routes: Routes = [
  { path: '', component: UnploadFileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnploadFileRoutingModule { }
