import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filterResponse, uploadProdress } from 'src/app/shared/operators/rxjs-operators';
import { environment } from 'src/environments/environment';
import { UploadFileService } from '../services/upload-file.service';

@Component({
  selector: 'app-unpload-file',
  templateUrl: './unpload-file.component.html',
  styles: []
})
export class UnploadFileComponent implements OnInit {

  // Set é um array que não permite duplicações
  files: Set<File>
  progress = 0

  constructor(
    private uploadFileService: UploadFileService
  ) { }

  ngOnInit() {
  }

  onChange(event){
    const selectedFiles = <FileList>event.srcElement.files
    //document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name

    let fileNames = []
    this.files = new Set()
    for(let i = 0; i < selectedFiles.length; i++){
      fileNames.push(selectedFiles[i].name)
      this.files.add(selectedFiles[i])
    }
    
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ')
    this.progress = 0
  }

  onUpload(){
    if (this.files && this.files.size > 0) {
      this.uploadFileService.upload(this.files, `${environment.BASE_URL}/upload`)
        .pipe(
          uploadProdress(progress => this.progress = progress),
          filterResponse()
        )
        .subscribe(res => console.log('Upload Concluído!'))

        // feito sem os operators do rxjs (que foram criados de forma customizada)
        // .subscribe((event: HttpEvent<Object>) => {
        //   if (event.type === HttpEventType.Response) {
        //     // console.log(event)
        //   }else if (event.type === HttpEventType.UploadProgress) {
        //      // this.progress = Math.round((event.loaded * 100) / event.total)
        //   }
        // })
    }
  }

  onDownloadExcel(){
    this.uploadFileService.download(environment.BASE_URL + '/downloadExcel')
      .subscribe((res: any) => {
        this.uploadFileService.handleFile(res, 'report.xlsx')
      })
  }

  onDownloadPdf(){
    this.uploadFileService.download(`${environment.BASE_URL}/downloadPdf`)
      .subscribe((res: any) => this.uploadFileService.handleFile(res, 'report.pdf')
      )
  }

}
