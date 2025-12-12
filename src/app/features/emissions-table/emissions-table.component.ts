import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmissionsStateService, EmissionEntry, EmissionCategory, EmissionUnit } from '../../core/emissions-state.service';
import { NavigationComponent } from '../../core/navigation/navigation.component';

type SortField = 'date' | 'amount';
type SortDirection = 'asc' | 'desc';

interface EditFormData {
  category: EmissionCategory | '';
  activity: string;
  amount: number;
  unit: EmissionUnit | '';
  date: string;
  notes: string;
}

@Component({
  selector: 'app-emissions-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavigationComponent],
  templateUrl: './emissions-table.component.html',
  styleUrl: './emissions-table.component.scss'
})
export class EmissionsTableComponent {
  rawEmissions$!: Observable<EmissionEntry[]>;

  categories: (EmissionCategory | 'All')[] = ['All', 'Transport', 'Energy', 'Food', 'Waste'];
  selectedCategory: EmissionCategory | 'All' = 'All';
  searchTerm = '';
  sortField: SortField = 'date';
  sortDirection: SortDirection = 'desc';

  editingId: string | null = null;
  editForm: EditFormData = {
    category: '',
    activity: '',
    amount: 0,
    unit: '',
    date: '',
    notes: ''
  };

  constructor(private readonly emissionsState: EmissionsStateService) {
    this.rawEmissions$ = this.emissionsState.emissions$;
  }

  // Since we are not using reactive streams for controls here,
  // expose a method to recalculate when filters/sort change.
  get filteredAndSorted(): Observable<EmissionEntry[]> {
    return this.rawEmissions$.pipe(map(list => this.applyTransformations(list)));
  }

  private applyTransformations(list: EmissionEntry[]): EmissionEntry[] {
    let result = [...list];

    if (this.selectedCategory !== 'All') {
      result = result.filter(e => e.category === this.selectedCategory);
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.trim().toLowerCase();
      result = result.filter(e => e.activity.toLowerCase().includes(term));
    }

    result.sort((a, b) => {
      const factor = this.sortDirection === 'asc' ? 1 : -1;
      if (this.sortField === 'date') {
        return factor * a.date.localeCompare(b.date);
      }
      // sortField === 'amount'
      return factor * (a.co2Kg - b.co2Kg);
    });

    return result;
  }

  onCategoryChange(): void {
    // trigger change detection via template async pipe using getter
  }

  onSearchChange(): void {
    // trigger change detection via template async pipe using getter
  }

  setSort(field: SortField): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'desc';
    }
  }

  delete(entry: EmissionEntry): void {
    const confirmed = confirm(`Delete emission for "${entry.activity}"?`);
    if (confirmed) {
      this.emissionsState.remove(entry.id);
    }
  }

  startEdit(entry: EmissionEntry): void {
    this.editingId = entry.id;
    this.editForm = {
      category: entry.category,
      activity: entry.activity,
      amount: entry.amount,
      unit: entry.unit,
      date: entry.date.split('T')[0],
      notes: entry.notes || ''
    };
  }

  cancelEdit(): void {
    this.editingId = null;
  }

  saveEdit(): void {
    if (this.editingId && this.editForm.category && this.editForm.unit) {
      this.emissionsState.update(this.editingId, {
        category: this.editForm.category as EmissionCategory,
        activity: this.editForm.activity,
        amount: this.editForm.amount,
        unit: this.editForm.unit as EmissionUnit,
        date: new Date(this.editForm.date).toISOString(),
        notes: this.editForm.notes
      });
      this.editingId = null;
    }
  }
}
