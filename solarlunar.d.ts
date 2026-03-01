export interface SolarLunarResult {
  lYear: number;
  lMonth: number;
  lDay: number;
  animal: string;
  yearCn: string;
  monthCn: string;
  dayCn: string;
  cYear: number;
  cMonth: number;
  cDay: number;
  gzYear: string;
  gzMonth: string;
  gzDay: string;
  isToday: boolean;
  isLeap: boolean;
  nWeek: number;
  ncWeek: string;
  isTerm: boolean;
  term: string;
}

declare const solarLunar: {
  lunarInfo: number[];
  solarMonth: number[];
  gan: string[];
  zhi: string[];
  animals: string[];
  lunarTerm: string[];
  lTermInfo: string[];
  nStr1: string[];
  nStr2: string[];
  nStr3: string[];
  nStr4: string[];

  lYearDays(y: number): number;
  leapMonth(y: number): number;
  leapDays(y: number): number;
  monthDays(y: number, m: number): number;
  solarDays(y: number, m: number): number;
  toGanZhi(offset: number): string;
  getTerm(y: number, n: number): number;
  toChinaYear(y: number): string;
  toChinaMonth(m: number): string;
  toChinaDay(d: number): string;
  getAnimal(y: number, month?: number, day?: number): string;
  getShiChen(hour: number, dayGanIndex: number): string;
  getFestivals(year: number, month: number, day: number): string[];
  addFestival(name: string, month: number, day: number): void;
  clearFestivals(): void;
  solar2lunar(year?: number, month?: number, day?: number): SolarLunarResult | -1;
  lunar2solar(
    year: number,
    month: number,
    day: number,
    isLeapMonth?: boolean
  ): SolarLunarResult | -1;

  (year?: number, month?: number, day?: number): SolarLunarResult | -1;
};

export default solarLunar;
