import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayService } from './services/holiday.service';
import { DateCalculatorService } from './services/date-calculator.service';
import { CountryConfig } from './models/country-data.model';
import { CalculationResult, ExcludedDay } from './models/date-calculator.model';
import { I18nService } from './services/i18n.service';
import { TranslatePipe } from './pipes/translate.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslatePipe],
})
export class AppComponent {
  private holidayService = inject(HolidayService);
  private dateCalculatorService = inject(DateCalculatorService);
  i18n = inject(I18nService);

  countries = signal<CountryConfig[]>([]);
  
  // Inputs
  selectedCountryCode = signal<string>('US');
  startDateString = signal<string>(this.getTodayString());
  workingDays = signal<number>(10);
  
  // UI State
  showExcludedDays = signal<boolean>(false);
  showReminderSuccess = signal<boolean>(false);

  // Mock features state
  reminderCredits = signal<number>(0);

  // Computed state
  selectedCountryConfig = computed(() => this.holidayService.getCountryConfig(this.selectedCountryCode()));
  
  calculationResult = computed<CalculationResult>(() => {
    const config = this.selectedCountryConfig();
    const start = this.startDateString();
    const days = this.workingDays();
    
    if (!config || !start || days < 0) {
      return { resultDate: null, plainDate: null, excludedDays: [] };
    }
    
    const startDate = new Date(start + 'T00:00:00');
    return this.dateCalculatorService.computeResultDate(startDate, days, config);
  });

  resultDate = computed(() => this.calculationResult().resultDate);
  plainDate = computed(() => this.calculationResult().plainDate);
  excludedDays = computed(() => this.calculationResult().excludedDays);
  
  dayDifference = computed(() => {
    const res = this.resultDate();
    const plain = this.plainDate();
    if (!res || !plain) return 0;
    
    const resUTC = Date.UTC(res.getFullYear(), res.getMonth(), res.getDate());
    const plainUTC = Date.UTC(plain.getFullYear(), plain.getMonth(), plain.getDate());
    return Math.round((resUTC - plainUTC) / (1000 * 60 * 60 * 24));
  });

  holidaysForDisplay = computed(() => {
    const config = this.selectedCountryConfig();
    const start = this.startDateString();
    if (!config || !start) return [];
    
    const startDate = new Date(start + 'T00:00:00');
    const startYear = startDate.getFullYear();

    return config.holidays.filter(h => h.date.startsWith(startYear.toString()));
  });
  
  constructor() {
    this.countries.set(this.holidayService.getCountries());
  }
  
  onCountryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCountryCode.set(selectElement.value);
  }

  onStartDateChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.startDateString.set(inputElement.value);
  }

  onWorkingDaysChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = parseInt(inputElement.value, 10);
    this.workingDays.set(isNaN(value) ? 0 : value);
  }

  watchAd() {
    this.reminderCredits.update(c => c + 1);
  }

  addReminder() {
    if (this.reminderCredits() > 0 && this.resultDate()) {
      this.reminderCredits.update(c => c - 1);
      this.showReminderSuccess.set(true);
      setTimeout(() => this.showReminderSuccess.set(false), 3000);
    }
  }

  toggleExcludedDays() {
    this.showExcludedDays.update(v => !v);
  }

  abs(n: number): number {
    return Math.abs(n);
  }

  private getTodayString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
