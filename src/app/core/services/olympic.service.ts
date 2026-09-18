import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Olympic } from '../models/olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private readonly olympicUrl = './assets/mock/olympic.json';
  private readonly olympics$ = new BehaviorSubject<Olympic[] | null>(null);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((olympics) => this.olympics$.next(this.sortByTotalMedalsDesc(olympics))),
      catchError((error: HttpErrorResponse) => {
        console.error('Failed to load Olympic data', error);
        this.olympics$.next([]);
        return of([]);
      })
    );
  }

  getOlympics(): Observable<Olympic[] | null> {
    return this.olympics$.asObservable();
  }

  private sortByTotalMedalsDesc(olympics: Olympic[]): Olympic[] {
    return [...olympics].sort((a, b) => this.totalMedals(b) - this.totalMedals(a));
  }

  private totalMedals(olympic: Olympic): number {
    return olympic.participations.reduce((total, participation) => total + participation.medalsCount, 0);
  }
}
