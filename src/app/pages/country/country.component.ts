import { AfterViewInit, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Chart from 'chart.js/auto';
import { Olympic } from '../../core/models/olympic';
import { StatItem } from '../../core/models/stat-item';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
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
    private olympicService: OlympicService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.countryId = idParam !== null ? Number(idParam) : null;
    this.olympicService
      .getOlympics()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((olympics) => {
        if (!olympics) {
          return;
        }
        this.selectedCountry = olympics.find((olympic) => olympic.id === this.countryId);
        if (!this.selectedCountry) {
          this.router.navigate(['/not-found']);
          return;
        }
        const participations = this.selectedCountry.participations;
        this.titlePage = this.selectedCountry.country;
        this.stats = [
          { label: 'Number of entries', value: participations.length },
          {
            label: 'Total Number of medals',
            value: participations.reduce((total, participation) => total + participation.medalsCount, 0),
          },
          {
            label: 'Total Number of athletes',
            value: participations.reduce((total, participation) => total + participation.athleteCount, 0),
          },
        ];
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

  private renderLineChart(): void {
    if (!this.selectedCountry) {
      return;
    }
    const years = this.selectedCountry.participations.map((participation) => participation.year);
    const medals = this.selectedCountry.participations.map((participation) => participation.medalsCount);
    this.lineChart?.destroy();
    this.lineChart = new Chart('countryChart', {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'medals',
            data: medals,
            backgroundColor: '#0b868f',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          x: {
            title: { display: true, text: 'Dates' },
          },
        },
      },
    });
  }
}
