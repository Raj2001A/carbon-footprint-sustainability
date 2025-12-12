import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmissionsStateService, EmissionEntry } from '../../core/emissions-state.service';
import { NavigationComponent } from '../../core/navigation/navigation.component';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('monthlyChartCanvas') monthlyChartRef!: ElementRef<HTMLCanvasElement>;

  total$!: Observable<number>;
  monthlyAverage$!: Observable<number>;
  highestSource$!: Observable<EmissionEntry | null>;
  trend$!: Observable<'up' | 'down' | 'flat' | 'none'>;
  topEmissions$!: Observable<EmissionEntry[]>;

  private monthlyChart?: Chart;
  private sub?: Subscription;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor(private readonly emissionsState: EmissionsStateService) {
    this.total$ = this.emissionsState.totalCo2$();
    this.monthlyAverage$ = this.emissionsState.monthlyAverage$();
    this.highestSource$ = this.emissionsState.highestSource$();
    this.trend$ = this.emissionsState.trendDirection$();
    this.topEmissions$ = this.emissionsState.emissions$.pipe(
      map(entries => entries.sort((a, b) => b.co2Kg - a.co2Kg).slice(0, 5))
    );
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    this.sub = this.emissionsState.emissions$.subscribe(entries => {
      const { labels, datasets } = this.buildMonthlyChart(entries);
      if (!this.monthlyChart && this.monthlyChartRef) {
        this.createMonthlyChart(labels, datasets);
      } else if (this.monthlyChart) {
        this.monthlyChart.data.labels = labels;
        this.monthlyChart.data.datasets = datasets;
        this.monthlyChart.update();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.monthlyChart?.destroy();
  }

  private buildMonthlyChart(entries: EmissionEntry[]): { labels: string[]; datasets: any[] } {
    const monthlyData: Record<string, number> = {};

    for (const e of entries) {
      try {
        const date = new Date(e.date);
        const monthKey = date.toLocaleString('en-US', { year: 'numeric', month: 'short' });
        monthlyData[monthKey] = (monthlyData[monthKey] ?? 0) + e.co2Kg;
      } catch {
        // Skip invalid entries
      }
    }

    const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });

    const monthlyTotals = sortedMonths.map(month => monthlyData[month]);

    const datasets = [{
      label: 'Monthly CO₂ Emissions',
      data: monthlyTotals,
      borderColor: '#0d7377',
      backgroundColor: 'rgba(13, 115, 119, 0.2)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointRadius: 6,
      pointBackgroundColor: '#0d7377',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointHoverRadius: 8
    }];

    return { labels: sortedMonths, datasets };
  }

  private createMonthlyChart(labels: string[], datasets: any[]): void {
    const ctx = this.monthlyChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    const config: ChartConfiguration = {
      type: 'line' as ChartType,
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        },
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              font: { size: 12, weight: 'bold' },
              padding: 15,
              color: '#0d2e28',
              usePointStyle: true
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(13, 46, 40, 0.95)',
            padding: 12,
            titleFont: { size: 13, weight: 'bold' },
            bodyFont: { size: 12 },
            borderColor: 'rgba(45, 139, 114, 0.4)',
            borderWidth: 2,
            callbacks: {
              label: (ctx: any) => ` ${ctx.parsed.y.toFixed(2)} kg CO₂`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#4d7367', font: { weight: 600, size: 11 } },
            grid: { color: 'rgba(45, 139, 114, 0.1)', lineWidth: 1 },
            title: {
              display: true,
              text: 'CO₂ (kg)',
              color: '#0d2e28',
              font: { weight: 'bold', size: 11 }
            }
          },
          x: {
            ticks: { color: '#4d7367', font: { weight: 600, size: 11 } },
            grid: { display: false }
          }
        }
      }
    };

    this.monthlyChart = new Chart(ctx, config);
  }
}
