
import { Component, ChangeDetectionStrategy, signal, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayService } from './services/holiday.service';
import { DateCalculatorService } from './services/date-calculator.service';
import { CountryConfig } from './models/country-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class AppComponent {
  private holidayService = inject(HolidayService);
  private dateCalculatorService = inject(DateCalculatorService);

  countries = signal<CountryConfig[]>([]);
  
  // Inputs
  selectedCountryCode = signal<string>('US');
  startDateString = signal<string>(this.getTodayString());
  workingDays = signal<number>(10);
  
  // Mock features state
  reminderCredits = signal<number>(0);
  showReminderSuccess = signal<boolean>(false);

  // Computed state
  selectedCountryConfig = computed(() => this.holidayService.getCountryConfig(this.selectedCountryCode()));
  
  calculationResult = computed(() => {
    const config = this.selectedCountryConfig();
    const start = this.startDateString();
    const days = this.workingDays();
    
    if (!config || !start || days < 0) {
      return { date: null, note: 'Invalid input' };
    }
    
    // The input date string 'YYYY-MM-DD' is treated as UTC midnight.
    // To avoid timezone shifts, we construct the Date object carefully.
    const startDate = new Date(start + 'T00:00:00');

    const resultDate = this.dateCalculatorService.computeResultDate(startDate, days, config);
    if (!resultDate) return { date: null, note: '' };

    const note = `Calculated from ${start}, excluding weekends and ${config.countryName} public holidays.`;
    return { date: resultDate, note };
  });

  resultDate = computed(() => this.calculationResult().date);
  resultNote = computed(() => this.calculationResult().note);

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

  private getTodayString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
