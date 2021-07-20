import { HttpClient } from '@angular/common/http';
import { delay, take, tap } from 'rxjs/operators';


export class CrudService<T> {

	constructor(
		protected http: HttpClient,
		private API_URL,
	) { }

	list() {
		return this.http.get<T[]>(`${this.API_URL}`)
			.pipe(
				delay(500),
				tap(console.log)
			)
	}

	loadById(id) {
		return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1))
	}

	private create(record: T) {
		return this.http.post(`${this.API_URL}`, record).pipe(take(1))
	}

	private update(record: T) {
		return this.http.put(`${this.API_URL}/${record['id']}`, record).pipe(take(1))
	}

	delete(id) {
		return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1))
	}

	save(record: T) {
		return record['id'] ? this.update(record) : this.create(record)
	}
}
