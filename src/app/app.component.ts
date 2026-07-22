import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService
      .loadInitialData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
