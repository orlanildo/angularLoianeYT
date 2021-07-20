import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(
    private http: HttpClient,
  ) { }

  upload(files: Set<File>, url: string){
    const formData = new FormData()
    files.forEach(file => formData.append('file', file, file.name))

    // const req = new HttpRequest('POST', url, formData)
    // return this.http.request(req) 

    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true
    })
  }

  download(url: string){
    return this.http.get(url, {
      responseType: 'blob' as 'json',
    })
  }

  handleFile(res: any, fileName: string){
    const file = new Blob([res], { type: res.type })

    // suporte para down no Internet Explorer (IE)
    if(window.navigator && window.navigator.msSaveOrOpenBlob){
      window.navigator.msSaveOrOpenBlob(file)
      return
    }

    const blob = window.URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = blob
    link.download = fileName
    link.click() // não funciona no FireFox

    // suporte para down no Firefox
    // link.dispatchEvent(new MouseEvent('click', {
    //   bubbles: true,
    //   cancelable: true,
    //   view: window
    // }))

    // Para remove no Firefox, precisa estar dentro de um pequeno timeout
    // mas para o Chrome NÃO!
    setTimeout(() => {
      window.URL.revokeObjectURL(blob)
      link.remove()
    }, 100)
  }

}
