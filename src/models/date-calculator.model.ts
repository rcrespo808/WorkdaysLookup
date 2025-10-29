export interface ExcludedDay {
  date: Date;
  reason: string; // 'weekend' or holiday name
}

export interface CalculationResult {
  resultDate: Date | null;
  plainDate: Date | null;
  excludedDays: ExcludedDay[];
}
