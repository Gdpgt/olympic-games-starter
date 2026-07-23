import { AfterViewInit, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Chart, { ChartEvent } from 'chart.js/auto';
import { Olympic } from '../../core/models/olympic';
import { StatItem } from '../../core/models/stat-item';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  public titlePage = 'Medals per Country';
  public stats: StatItem[] = [];

  private readonly destroyRef = inject(DestroyRef);
  private olympics: Olympic[] = [];
  private viewReady = false;
  private pieChart?: Chart<'pie', number[], string>;

  constructor(private router: Router, private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympicService
      .getOlympics()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((olympics) => {
        if (!olympics || olympics.length === 0) {
          return;
        }
        this.olympics = olympics;
        const totalJOs = new Set(
          olympics.flatMap((olympic) => olympic.participations.map((participation) => participation.year))
        ).size;
        this.stats = [
          { label: 'Number of countries', value: olympics.length },
          { label: 'Number of JOs', value: totalJOs },
        ];
        if (this.viewReady) {
          this.renderPieChart();
        }
      });
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    if (this.olympics.length > 0) {
      this.renderPieChart();
    }
  }

  private renderPieChart(): void {
    const countries = this.olympics.map((olympic) => olympic.country);
    const medalsPerCountry = this.olympics.map((olympic) =>
      olympic.participations.reduce((total, participation) => total + participation.medalsCount, 0)
    );
    this.pieChart?.destroy();
    this.pieChart = new Chart('DashboardPieChart', {
      type: 'pie',
      data: {
        labels: countries,
        datasets: [
          {
            label: 'Medals',
            data: medalsPerCountry,
            backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        onClick: (event) => this.onChartClick(event),
      },
    });
  }

  private onChartClick(event: ChartEvent): void {
    if (!event.native || !this.pieChart) {
      return;
    }
    const points = this.pieChart.getElementsAtEventForMode(event.native, 'point', { intersect: true }, true);
    if (points.length === 0) {
      return;
    }
    const olympic = this.olympics[points[0].index];
    if (olympic) {
      this.router.navigate(['country', olympic.id]);
    }
  }
}
