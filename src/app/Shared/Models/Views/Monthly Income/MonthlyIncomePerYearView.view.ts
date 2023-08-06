export interface MonthlyIncomePerYearView{
  years: YearView[];
  incomes: MonthlyIncomeView[];
}

interface YearView{
  id: number;
  value: number;
}

interface MonthlyIncomeView{
  month: string;
  price: number;
}
