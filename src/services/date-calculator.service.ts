import { Injectable } from '@angular/core';
import { CountryConfig } from '../models/country-data.model';
import { CalculationResult, ExcludedDay } from '../models/date-calculator.model';

@Injectable({
  providedIn: 'root',
})
export class DateCalculatorService {
  
  computeResultDate(
    startDate: Date,
    workingDays: number,
    config: CountryConfig
  ): CalculationResult {
    if (isNaN(startDate.getTime()) || workingDays < 0) {
      return { resultDate: null, plainDate: null, excludedDays: [] };
    }

    const holidays = new Set(config.holidays.map(h => h.date));
    const weekend = new Set(config.weekend);
    const excludedDays: ExcludedDay[] = [];

    let currentDate = new Date(startDate.getTime());
    let daysAdded = 0;
    
    const plainDate = new Date(startDate);
    plainDate.setDate(startDate.getDate() + workingDays);

    // Start counting from the day after the start date
    currentDate.setDate(currentDate.getDate() + 1);

    if (workingDays === 0) {
        // Find next working day if start date is not a working day
        while (weekend.has(currentDate.getDay()) || holidays.has(this.formatDate(currentDate))) {
            this.addExcludedDay(currentDate, weekend, holidays, config, excludedDays);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return { resultDate: currentDate, plainDate: startDate, excludedDays };
    }

    while (daysAdded < workingDays) {
      const dayOfWeek = currentDate.getDay();
      const dateString = this.formatDate(currentDate);

      if (!weekend.has(dayOfWeek) && !holidays.has(dateString)) {
        daysAdded++;
      } else {
        this.addExcludedDay(currentDate, weekend, holidays, config, excludedDays);
      }

      // If we haven't reached the target, move to the next day
      if (daysAdded < workingDays) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    
    return { resultDate: currentDate, plainDate, excludedDays };
  }
  
  private addExcludedDay(
    date: Date, 
    weekend: Set<number>, 
    holidays: Set<string>, 
    config: CountryConfig, 
    excludedDays: ExcludedDay[]
  ) {
    const dayOfWeek = date.getDay();
    const dateString = this.formatDate(date);
    let reason = '';

    if (weekend.has(dayOfWeek)) {
      reason = 'weekend';
    } else if (holidays.has(dateString)) {
      reason = config.holidays.find(h => h.date === dateString)?.name || 'Holiday';
    }
    
    if (reason) {
       excludedDays.push({ date: new Date(date.getTime()), reason });
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
