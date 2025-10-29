
import { Injectable, signal } from '@angular/core';
import { CountryConfig } from '../models/country-data.model';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private countryData: CountryConfig[] = [
    {
      countryCode: 'US',
      countryName: 'United States',
      weekend: [0, 6], // Sunday, Saturday
      holidays: [
        { date: '2024-01-01', name: "New Year's Day" },
        { date: '2024-01-15', name: 'Martin Luther King, Jr. Day' },
        { date: '2024-02-19', name: "Washington's Birthday" },
        { date: '2024-05-27', name: 'Memorial Day' },
        { date: '2024-06-19', name: 'Juneteenth National Independence Day' },
        { date: '2024-07-04', name: 'Independence Day' },
        { date: '2024-09-02', name: 'Labor Day' },
        { date: '2024-10-14', name: 'Columbus Day' },
        { date: '2024-11-11', name: 'Veterans Day' },
        { date: '2024-11-28', name: 'Thanksgiving Day' },
        { date: '2024-12-25', name: 'Christmas Day' },
        { date: '2025-01-01', name: "New Year's Day" },
        { date: '2025-01-20', name: 'Martin Luther King, Jr. Day' },
        { date: '2025-02-17', name: "Washington's Birthday" },
        { date: '2025-05-26', name: 'Memorial Day' },
        { date: '2025-06-19', name: 'Juneteenth National Independence Day' },
        { date: '2025-07-04', name: 'Independence Day' },
        { date: '2025-09-01', name: 'Labor Day' },
        { date: '2025-10-13', name: 'Columbus Day' },
        { date: '2025-11-11', name: 'Veterans Day' },
        { date: '2025-11-27', name: 'Thanksgiving Day' },
        { date: '2025-12-25', name: 'Christmas Day' },
      ],
    },
    {
      countryCode: 'BO',
      countryName: 'Bolivia',
      weekend: [0, 6],
      holidays: [
        { date: '2024-01-01', name: 'Año Nuevo' },
        { date: '2024-01-22', name: 'Día del Estado Plurinacional' },
        { date: '2024-02-12', name: 'Carnaval' },
        { date: '2024-02-13', name: 'Carnaval' },
        { date: '2024-03-29', name: 'Viernes Santo' },
        { date: '2024-05-01', name: 'Día del Trabajo' },
        { date: '2024-05-30', name: 'Corpus Christi' },
        { date: '2024-06-21', name: 'Año Nuevo Aymara' },
        { date: '2024-08-06', name: 'Día de la Independencia' },
        { date: '2024-11-02', name: 'Día de los Difuntos' },
        { date: '2024-12-25', name: 'Navidad' },
        { date: '2025-01-01', name: 'Año Nuevo' },
        { date: '2025-01-22', name: 'Día del Estado Plurinacional' },
        { date: '2025-03-03', name: 'Carnaval' },
        { date: '2025-03-04', name: 'Carnaval' },
        { date: '2025-04-18', name: 'Viernes Santo' },
        { date: '2025-05-01', name: 'Día del Trabajo' },
        { date: '2025-06-19', name: 'Corpus Christi' },
        { date: '2025-06-21', name: 'Año Nuevo Aymara' },
        { date: '2025-08-06', name: 'Día de la Independencia' },
        { date: '2025-11-02', name: 'Día de los Difuntos' },
        { date: '2025-12-25', name: 'Navidad' },
      ],
    },
     {
      countryCode: 'JP',
      countryName: 'Japan',
      weekend: [0, 6],
      holidays: [
        { date: '2024-01-01', name: "New Year's Day" },
        { date: '2024-01-08', name: 'Coming of Age Day' },
        { date: '2024-02-11', name: 'National Foundation Day' },
        { date: '2024-02-12', name: 'Holiday in lieu' },
        { date: '2024-02-23', name: "The Emperor's Birthday" },
        { date: '2024-03-20', name: 'Vernal Equinox Day' },
        { date: '2024-04-29', name: 'Shōwa Day' },
        { date: '2024-05-03', name: 'Constitution Memorial Day' },
        { date: '2024-05-04', name: 'Greenery Day' },
        { date: '2024-05-05', name: "Children's Day" },
        { date: '2024-05-06', name: 'Holiday in lieu' },
        { date: '2024-07-15', name: 'Marine Day' },
        { date: '2024-08-11', name: 'Mountain Day' },
        { date: '2024-08-12', name: 'Holiday in lieu' },
        { date: '2024-09-16', name: 'Respect for the Aged Day' },
        { date: '2024-09-22', name: 'Autumnal Equinox Day' },
        { date: '2024-09-23', name: 'Holiday in lieu' },
        { date: '2024-10-14', name: 'Sports Day' },
        { date: '2024-11-03', name: 'Culture Day' },
        { date: '2024-11-04', name: 'Holiday in lieu' },
        { date: '2024-11-23', name: 'Labour Thanksgiving Day' },
      ],
    },
  ];

  getCountries() {
    return this.countryData;
  }

  getCountryConfig(countryCode: string): CountryConfig | undefined {
    return this.countryData.find(c => c.countryCode === countryCode);
  }
}
