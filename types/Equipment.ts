export interface IEquipment {
  id?: string;
  category?: Category;
  model: string;
  maxCapacityFilters?: number;
  buyDate: string;
  putIntoServiceDate: string;
  nextCleanFiltersDate?: string;
  nextDescalingDate?: string;
  nextChangeOilDate?: string;
  nextCleanTanks?: number;
  nextChangeFiltersDate?: string;
  litersUsed?: number;
  leftCapacityFilters?: number;
  tanksCleaned?: boolean;
}

export enum Category {
  WATER_FILTER_SYSTEM = "Système de filtration d'eau",
  COFFEE_MACHINE = "Machine à café",
  TREADMILL = "Tapis de course",
}

export type Equipments = { equipments: IEquipment[] };
