import {
  AfterViewInit,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Chart from 'chart.js/auto';
import { CHART_PRIMARY_COLOR } from '../../core/constants/chart-colors';
import { Olympic } from '../../core/models/olympic';
import { Participation } from '../../core/models/participation';
import { StatItem } from '../../core/models/stat-item';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
})
export class CountryComponent implements OnInit, AfterViewInit {
  public titlePage = '';
  public stats: StatItem[] = [];

  private readonly destroyRef = inject(DestroyRef);
  private countryId: number | null = null;
  private selectedCountry?: Olympic;
  private viewReady = false;
  private lineChart?: Chart<'line', number[], number>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.countryId = idParam !== null ? Number(idParam) : null;
    this.olympicService
      .getOlympics()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((olympics) => {
        if (olympics === null) {
          return;
        }
        if (olympics.length === 0) {
          this.router.navigate(['/data-unavailable'], { skipLocationChange: true });
          return;
        }
        this.selectedCountry = olympics.find(
          (olympic) => olympic.id === this.countryId,
        );
        if (!this.selectedCountry) {
          this.router.navigate(['/not-found'], { skipLocationChange: true });
          return;
        }
        this.titlePage = this.selectedCountry.country;
        this.stats = this.buildStats(this.selectedCountry.participations);
        if (this.viewReady) {
          this.renderLineChart();
        }
      });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    if (this.selectedCountry) {
      this.renderLineChart();
    }
  }

  private buildStats(participations: Participation[]): StatItem[] {
    return [
      { label: 'Number of entries', value: participations.length },
      {
        label: 'Total Number of medals',
        value: participations.reduce(
          (total, participation) => total + participation.medalsCount,
          0,
        ),
      },
      {
        label: 'Total Number of athletes',
        value: participations.reduce(
          (total, participation) => total + participation.athleteCount,
          0,
        ),
      },
    ];
  }

  private renderLineChart(): void {
    if (!this.selectedCountry) {
      return;
    }
    const years = this.selectedCountry.participations.map(
      (participation) => participation.year,
    );
    const medals = this.selectedCountry.participations.map(
      (participation) => participation.medalsCount,
    );
    this.lineChart?.destroy();
    this.lineChart = new Chart('countryChart', {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'medals',
            data: medals,
            backgroundColor: CHART_PRIMARY_COLOR,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: { display: true, text: 'Dates' },
          },
        },
      },
    });
  }
}
