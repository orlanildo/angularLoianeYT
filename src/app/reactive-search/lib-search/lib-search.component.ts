import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl()
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries'
  results$: Observable<any>
  total = 0
  readonly fields = 'name,description,version,homepage'


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.results$ = this.queryField.valueChanges.pipe(
      map(value => value.trim()),
      filter(value => value.length > 1),
      debounceTime(300), // Dá um delay para que não fassa uma req por letra
      distinctUntilChanged(), // Evita requisições com valores repitidos
      switchMap(value => this.http.get(this.SEARCH_URL, {
        params: { search: value, fields: this.fields }
      })),
      tap((res: any) => this.total = res.total),
      map((res: any) => res.results)
    )
  }

  onSearch(){
    let value = this.queryField.value.trim()
    if (value && value !== '') {
      // const params_ = { search: value, fields: fields } // Ou com HttpParams
      let params = new HttpParams()
      params = params.set('search', value)
      params = params.set('fields', this.fields)

      this.results$ = this.http.get(this.SEARCH_URL, { params }).pipe(
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
      )
    }
    // console.log(this.queryField.value)
  }

}
