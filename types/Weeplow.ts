export interface IWeeplow {
  id?: number;
  model: string;
  maxCapacityFilters: number;
  buyDate: string;
  putIntoServiceDate: string;
  nextCleanFiltersDate?: string;
  nextCleanTanks?: number;
  nextChangeFiltersDate?: string;
  litersUsed?: number;
  leftCapacityFilters?: number;
  tanksCleaned?: boolean;
}
