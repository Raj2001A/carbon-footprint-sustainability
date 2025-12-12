import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmissionsStateService, EmissionEntry } from '../../core/emissions-state.service';
import { Subscription } from 'rxjs';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-emissions-chart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emissions-chart.component.html',
  styleUrl: './emissions-chart.component.scss'
})
export class EmissionsChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('trendChartCanvas') trendChartRef!: ElementRef<HTMLCanvasElement>;

  private trendChart?: Chart;
  private sub?: Subscription;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor(private readonly emissionsState: EmissionsStateService) {}

  ngAfterViewInit(): void {
    // Only initialize chart in browser environment (not during SSR)
    if (!this.isBrowser) {
      return;
    }

    this.sub = this.emissionsState.emissions$.subscribe(entries => {
      const { labels: trendLabels, datasets: trendDatasets } = this.buildMonthlyTrend(entries);
      if (!this.trendChart) {
        this.createTrendChart(trendLabels, trendDatasets);
      } else {
        this.trendChart.data.labels = trendLabels;
        this.trendChart.data.datasets = trendDatasets;
        this.trendChart.update();
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.trendChart?.destroy();
  }

  private buildMonthlyTrend(entries: EmissionEntry[]): { labels: string[]; datasets: any[] } {
    // Group emissions by month
    const monthlyData: Record<string, number> = {};

    for (const e of entries) {
      try {
        const date = new Date(e.date);
        const monthKey = date.toLocaleString('en-US', { year: 'numeric', month: 'short' });

        monthlyData[monthKey] = (monthlyData[monthKey] ?? 0) + e.co2Kg;
      } catch {
        // Skip invalid entries silently
      }
    }

    // Sort months chronologically
    const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });

    // Get monthly totals
    const monthlyTotals = sortedMonths.map(month => monthlyData[month]);

    // Create single dataset for total emissions
    const datasets = [{
      label: 'Total CO₂ Emissions',
      data: monthlyTotals,
      borderColor: '#0d2e28',
      backgroundColor: 'rgba(13, 46, 40, 0.15)',
      borderWidth: 3,
      fill: true,
      tension: 0.45,
      pointRadius: 7,
      pointBackgroundColor: '#0d2e28',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 3,
      pointHoverRadius: 10,
      pointHoverBackgroundColor: '#0d2e28',
      pointHoverBorderWidth: 3,
      segment: {
        borderDash: () => undefined
      }
    }];

    return { labels: sortedMonths, datasets };
  }

  private createTrendChart(labels: string[], datasets: any[]): void {
    const ctx = this.trendChartRef.nativeElement.getContext('2d');
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
          duration: 1500,
          easing: 'easeInOutQuart',
          delay: (ctx: any) => {
            let delay = 0;
            if (ctx.type === 'data') {
              delay = ctx.dataIndex * 80 + ctx.datasetIndex * 150;
            }
            return delay;
          }
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
              font: { size: 13, weight: 'bold' },
              padding: 20,
              color: '#0d2e28',
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(13, 46, 40, 0.95)',
            padding: 14,
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 13 },
            borderColor: 'rgba(45, 139, 114, 0.4)',
            borderWidth: 2,
            displayColors: true,
            callbacks: {
              label: (ctx: any) => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)} kg CO₂`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#4d7367', font: { weight: 600, size: 12 } },
            grid: { color: 'rgba(45, 139, 114, 0.15)', lineWidth: 1.5 },
            title: {
              display: true,
              text: 'CO₂ Emissions (kg)',
              color: '#0d2e28',
              font: { weight: 'bold', size: 12 }
            }
          },
          x: {
            ticks: { color: '#4d7367', font: { weight: 600, size: 12 } },
            grid: { display: false }
          }
        }
      }
    };

    this.trendChart = new Chart(ctx, config);
  }
}
