
import { Injectable } from '@angular/core';
import { CountryConfig } from '../models/country-data.model';

@Injectable({
  providedIn: 'root',
})
export class DateCalculatorService {
  
  computeResultDate(
    startDate: Date,
    workingDays: number,
    config: CountryConfig
  ): Date | null {
    if (isNaN(startDate.getTime()) || workingDays < 0) {
      return null;
    }

    const holidays = new Set(config.holidays.map(h => h.date));
    const weekend = new Set(config.weekend);

    let currentDate = new Date(startDate.getTime());
    let daysAdded = 0;

    // Start counting from the day after the start date
    currentDate.setDate(currentDate.getDate() + 1);

    if (workingDays === 0) {
        // Find next working day if start date is not a working day
        while (weekend.has(currentDate.getDay()) || holidays.has(this.formatDate(currentDate))) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return currentDate;
    }

    while (daysAdded < workingDays) {
      const dayOfWeek = currentDate.getDay();
      const dateString = this.formatDate(currentDate);

      if (!weekend.has(dayOfWeek) && !holidays.has(dateString)) {
        daysAdded++;
      }

      // If we haven't reached the target, move to the next day
      if (daysAdded < workingDays) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
    
    return currentDate;
  }
  
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
