import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { EmissionsStateService, EmissionEntry } from '../../core/emissions-state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  total$!: Observable<number>;
  monthlyAverage$!: Observable<number>;
  highestSource$!: Observable<EmissionEntry | null>;
  trend$!: Observable<'up' | 'down' | 'flat' | 'none'>;

  constructor(private readonly emissionsState: EmissionsStateService) {
    this.total$ = this.emissionsState.totalCo2$();
    this.monthlyAverage$ = this.emissionsState.monthlyAverage$();
    this.highestSource$ = this.emissionsState.highestSource$();
    this.trend$ = this.emissionsState.trendDirection$();
  }
}
