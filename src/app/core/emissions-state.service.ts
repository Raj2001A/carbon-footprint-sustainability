import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type EmissionCategory = 'Transport' | 'Energy' | 'Food' | 'Waste';
export type EmissionUnit = 'km' | 'kWh' | 'kg';

export interface EmissionEntry {
  id: string;
  category: EmissionCategory;
  activity: string;
  amount: number;
  unit: EmissionUnit;
  date: string; // ISO string
  notes?: string;
  co2Kg: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmissionsStateService {
  private readonly STORAGE_KEY = 'carbon-footprint-emissions';
  private readonly emissionsSubject = new BehaviorSubject<EmissionEntry[]>([]);
  readonly emissions$: Observable<EmissionEntry[]> = this.emissionsSubject.asObservable();

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Simple conversion factors per category/unit (demo values, can be refined)
  private readonly factors: Record<EmissionCategory, Partial<Record<EmissionUnit, number>>> = {
    Transport: { km: 0.15 },
    Energy: { kWh: 0.4 },
    Food: { kg: 2.0 },
    Waste: { kg: 1.5 }
  };

  constructor() {
    if (this.isBrowser) {
      this.loadFromLocalStorage();
    }
    // Check if empty - if so, load mock data for demo
    if (this.emissionsSubject.value.length === 0) {
      this.initializeMockData();
    }
  }

  private loadFromLocalStorage(): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const emissions: EmissionEntry[] = JSON.parse(stored);
        // Validate data structure before using
        if (Array.isArray(emissions)) {
          this.emissionsSubject.next(emissions);
        }
      }
    } catch {
      // localStorage unavailable or data corrupted - start with empty state
    }
  }

  private saveToLocalStorage(): void {
    if (!this.isBrowser) {
      return;
    }
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.emissionsSubject.value));
    } catch {
      // localStorage unavailable or quota exceeded - silently fail
    }
  }

  private initializeMockData(): void {
    const mockEmissions: Omit<EmissionEntry, 'id' | 'co2Kg'>[] = [
      // September entries
      {
        category: 'Transport',
        activity: 'Car commute to office',
        amount: 15,
        unit: 'km',
        date: new Date(2024, 8, 15).toISOString(),
        notes: 'Daily commute'
      },
      {
        category: 'Transport',
        activity: 'Flight to Boston',
        amount: 1500,
        unit: 'km',
        date: new Date(2024, 8, 10).toISOString(),
        notes: 'Conference trip'
      },
      {
        category: 'Energy',
        activity: 'Electricity usage',
        amount: 95,
        unit: 'kWh',
        date: new Date(2024, 8, 20).toISOString(),
        notes: 'Monthly household electricity'
      },
      {
        category: 'Food',
        activity: 'Beef dinner',
        amount: 0.3,
        unit: 'kg',
        date: new Date(2024, 8, 18).toISOString(),
        notes: 'Red meat high carbon'
      },

      // October entries
      {
        category: 'Transport',
        activity: 'Car commute to office',
        amount: 18,
        unit: 'km',
        date: new Date(2024, 9, 12).toISOString(),
        notes: 'Daily commute'
      },
      {
        category: 'Transport',
        activity: 'Uber ride',
        amount: 8,
        unit: 'km',
        date: new Date(2024, 9, 15).toISOString(),
        notes: 'Evening trip downtown'
      },
      {
        category: 'Energy',
        activity: 'Home heating',
        amount: 150,
        unit: 'kWh',
        date: new Date(2024, 9, 10).toISOString(),
        notes: 'Natural gas heating'
      },
      {
        category: 'Energy',
        activity: 'Office power consumption',
        amount: 40,
        unit: 'kWh',
        date: new Date(2024, 9, 22).toISOString(),
        notes: 'Work computer and lights'
      },
      {
        category: 'Food',
        activity: 'Chicken lunch',
        amount: 0.2,
        unit: 'kg',
        date: new Date(2024, 9, 20).toISOString(),
        notes: 'White meat'
      },
      {
        category: 'Waste',
        activity: 'Plastic packaging',
        amount: 0.5,
        unit: 'kg',
        date: new Date(2024, 9, 25).toISOString(),
        notes: 'Non-recyclable plastic'
      },

      // November entries
      {
        category: 'Transport',
        activity: 'Flight to NYC',
        amount: 2200,
        unit: 'km',
        date: new Date(2024, 10, 5).toISOString(),
        notes: 'Business trip'
      },
      {
        category: 'Transport',
        activity: 'Bus commute',
        amount: 20,
        unit: 'km',
        date: new Date(2024, 10, 18).toISOString(),
        notes: 'Public transport'
      },
      {
        category: 'Energy',
        activity: 'Home heating',
        amount: 200,
        unit: 'kWh',
        date: new Date(2024, 10, 12).toISOString(),
        notes: 'Natural gas heating'
      },
      {
        category: 'Food',
        activity: 'Vegetarian meal',
        amount: 0.4,
        unit: 'kg',
        date: new Date(2024, 10, 15).toISOString(),
        notes: 'Plant-based dinner'
      },
      {
        category: 'Waste',
        activity: 'Paper waste',
        amount: 0.8,
        unit: 'kg',
        date: new Date(2024, 10, 20).toISOString(),
        notes: 'Office paper'
      },

      // December entries
      {
        category: 'Transport',
        activity: 'Car commute to office',
        amount: 12,
        unit: 'km',
        date: new Date(2024, 11, 10).toISOString(),
        notes: 'Daily commute'
      },
      {
        category: 'Transport',
        activity: 'Flight to NYC',
        amount: 2200,
        unit: 'km',
        date: new Date(2024, 11, 5).toISOString(),
        notes: 'Holiday trip'
      },
      {
        category: 'Energy',
        activity: 'Electricity usage',
        amount: 120,
        unit: 'kWh',
        date: new Date(2024, 11, 11).toISOString(),
        notes: 'Monthly household electricity'
      },
      {
        category: 'Energy',
        activity: 'Home heating',
        amount: 280,
        unit: 'kWh',
        date: new Date(2024, 11, 8).toISOString(),
        notes: 'Winter heating'
      },
      {
        category: 'Food',
        activity: 'Dairy products',
        amount: 0.15,
        unit: 'kg',
        date: new Date(2024, 11, 15).toISOString(),
        notes: 'Cheese and milk'
      },
      {
        category: 'Waste',
        activity: 'Electronic waste',
        amount: 0.2,
        unit: 'kg',
        date: new Date(2024, 11, 8).toISOString(),
        notes: 'Old laptop disposed'
      }
    ];

    // Add each mock entry
    mockEmissions.forEach(entry => {
      const co2Kg = this.calculateCo2(entry.category, entry.unit, entry.amount);
      const withId: EmissionEntry = {
        ...entry,
        id: crypto.randomUUID(),
        co2Kg
      };
      const current = this.emissionsSubject.value;
      this.emissionsSubject.next([...current, withId]);
    });

    this.saveToLocalStorage();
  }

  add(entry: Omit<EmissionEntry, 'id' | 'co2Kg'>): void {
    const co2Kg = this.calculateCo2(entry.category, entry.unit, entry.amount);
    const withId: EmissionEntry = {
      ...entry,
      id: crypto.randomUUID(),
      co2Kg
    };
    this.emissionsSubject.next([...this.emissionsSubject.value, withId]);
    this.saveToLocalStorage();
  }

  remove(id: string): void {
    this.emissionsSubject.next(this.emissionsSubject.value.filter(e => e.id !== id));
    this.saveToLocalStorage();
  }

  update(id: string, entry: Omit<EmissionEntry, 'id' | 'co2Kg'>): void {
    const co2Kg = this.calculateCo2(entry.category, entry.unit, entry.amount);
    const updated: EmissionEntry = {
      ...entry,
      id,
      co2Kg
    };
    const current = this.emissionsSubject.value;
    const index = current.findIndex(e => e.id === id);
    if (index !== -1) {
      const newList = [...current];
      newList[index] = updated;
      this.emissionsSubject.next(newList);
      this.saveToLocalStorage();
    }
  }

  clear(): void {
    this.emissionsSubject.next([]);
    this.saveToLocalStorage();
  }

  calculateCo2(category: EmissionCategory, unit: EmissionUnit, amount: number): number {
    const factor = this.factors[category]?.[unit] ?? 0;
    return +(amount * factor).toFixed(3);
  }

  totalCo2$(): Observable<number> {
    return this.emissions$.pipe(
      map(list => list.reduce((sum, e) => sum + e.co2Kg, 0))
    );
  }

  highestSource$(): Observable<EmissionEntry | null> {
    return this.emissions$.pipe(
      map(list => {
        if (!list.length) return null;
        return list.reduce((max, cur) => (cur.co2Kg > max.co2Kg ? cur : max), list[0]);
      })
    );
  }

  monthlyAverage$(): Observable<number> {
    return this.emissions$.pipe(
      map(list => {
        if (!list.length) return 0;
        const byMonth = new Map<string, number>();
        for (const e of list) {
          const d = new Date(e.date);
          const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
          byMonth.set(key, (byMonth.get(key) ?? 0) + e.co2Kg);
        }
        const totals = Array.from(byMonth.values());
        return totals.reduce((s, v) => s + v, 0) / totals.length;
      })
    );
  }

  trendDirection$(): Observable<'up' | 'down' | 'flat' | 'none'> {
    return this.emissions$.pipe(
      map(list => {
        if (list.length < 2) return 'none';
        const sorted = [...list].sort((a, b) => a.date.localeCompare(b.date));
        const recent = sorted[sorted.length - 1].co2Kg;
        const prev = sorted[sorted.length - 2].co2Kg;
        if (recent > prev) return 'up';
        if (recent < prev) return 'down';
        return 'flat';
      })
    );
  }
}
