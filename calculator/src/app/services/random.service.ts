import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RandomService {
  private apiUrl =
    'https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new';

  constructor(private http: HttpClient) {}

  getValue(): Observable<Number> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError((error) => {
        console.error(error);
        return throwError('An error occurred while retrieving the value.');
      })
    );
  }
}
