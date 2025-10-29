
export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
}

export interface CountryConfig {
  countryCode: string;
  countryName: string;
  weekend: number[]; // 0=Sunday, 1=Monday, ..., 6=Saturday
  holidays: Holiday[];
}
