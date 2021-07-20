import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnploadFileRoutingModule } from './unpload-file-routing.module';
import { UnploadFileComponent } from './unpload-file/unpload-file.component';

@NgModule({
  declarations: [
    UnploadFileComponent
  ],
  imports: [
    CommonModule,
    UnploadFileRoutingModule
  ]
})
export class UnploadFileModule { }
