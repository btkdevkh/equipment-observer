export const getNbLeftLiters = (
  nbLiterMax: number,
  nbLiterUsed: number = 0
) => {
  return nbLiterMax - nbLiterUsed;
};

export const getCurrentMonthDays = (): number => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // getMonth() returns 0–11
  return new Date(year, month, 0).getDate();
};

export const getCurrentDate = () => {
  const now = new Date();

  // Formatage en JJ/MM/AAAA
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getNextCleanTanks = (): number => {
  const now = new Date();
  const currentMonthDays = getCurrentMonthDays();
  return currentMonthDays - now.getDate();
};

export const getNextChangeFiltersDate = (lastChangedFiltersdDate: string) => {
  // On clone la date pour éviter de modifier l'original
  const nextDate = new Date(parseDateFR(lastChangedFiltersdDate));

  // Ajout de 2 ans
  nextDate.setFullYear(nextDate.getFullYear() + 2);

  // Formatage en JJ/MM/AAAA
  const day = nextDate.getDate().toString().padStart(2, "0");
  const month = (nextDate.getMonth() + 1).toString().padStart(2, "0");
  const year = nextDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getNextCleanFiltersDate = (lastCleanedFiltersDate: string) => {
  // On clone la date pour éviter de modifier l'original
  const nextDate = new Date(parseDateFR(lastCleanedFiltersDate));

  // Ajout de 3 mois
  nextDate.setMonth(nextDate.getMonth() + 3);

  // Formatage en JJ/MM/AAAA
  const day = nextDate.getDate().toString().padStart(2, "0");
  const month = (nextDate.getMonth() + 1).toString().padStart(2, "0");
  const year = nextDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getNextChangeDateInterval = (
  lastChangedDate: string,
  nb: number
) => {
  // On clone la date pour éviter de modifier l'original
  const nextDate = new Date(parseDateFR(lastChangedDate));

  // Ajout de nb mois
  nextDate.setMonth(nextDate.getMonth() + nb);

  // Formatage en JJ/MM/AAAA
  const day = nextDate.getDate().toString().padStart(2, "0");
  const month = (nextDate.getMonth() + 1).toString().padStart(2, "0");
  const year = nextDate.getFullYear();

  return `${day}/${month}/${year}`;
};

export const parseDateFR = (dateStr: string): Date => {
  const [jour, mois, année] = dateStr.split("/").map(Number);
  return new Date(année, mois - 1, jour); // mois commence à 0
};
