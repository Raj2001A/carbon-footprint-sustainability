import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmissionsStateService, EmissionCategory, EmissionUnit } from '../../core/emissions-state.service';
import { ToastService } from '../../core/toast.service';

function positiveAmountValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return Number(value) > 0 ? null : { positive: true };
}

function notInFutureValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }
  const selected = new Date(value);
  const today = new Date();
  selected.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return selected <= today ? null : { futureDate: true };
}

@Component({
  selector: 'app-add-emission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-emission.component.html',
  styleUrl: './add-emission.component.scss'
})
export class AddEmissionComponent {
  form: FormGroup;
  categories: EmissionCategory[] = ['Transport', 'Energy', 'Food', 'Waste'];
  units: EmissionUnit[] = ['km', 'kWh', 'kg'];
  previewCo2 = 0;
  submitted = false;
  isSubmitting = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly emissionsState: EmissionsStateService,
    private readonly toastService: ToastService
  ) {
    this.form = this.fb.group({
      category: [null as EmissionCategory | null, Validators.required],
      activity: ['', [Validators.required, Validators.maxLength(120)]],
      amount: [null, [Validators.required, positiveAmountValidator]],
      unit: [null as EmissionUnit | null, Validators.required],
      date: [null, [Validators.required, notInFutureValidator]],
      notes: ['']
    });

    this.form.valueChanges.subscribe(value => {
      const { category, unit, amount } = value;
      if (category && unit && typeof amount === 'number' && amount > 0) {
        this.previewCo2 = this.emissionsState.calculateCo2(category, unit, amount);
      } else {
        this.previewCo2 = 0;
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.error('Please fix the errors in the form.');
      return;
    }

    this.isSubmitting = true;
    const value = this.form.value;
    const dateIso = new Date(value.date).toISOString();
    // Store the CO2 value before resetting form
    const co2Value = this.previewCo2;

    setTimeout(() => {
      this.emissionsState.add({
        category: value.category,
        activity: value.activity,
        amount: value.amount,
        unit: value.unit,
        date: dateIso,
        notes: value.notes
      });

      this.form.reset();
      this.previewCo2 = 0;
      this.submitted = false;
      this.isSubmitting = false;

      this.toastService.success(`Emission recorded! ${co2Value.toFixed(2)} kg CO₂ added.`);
    }, 300);
  }
}
