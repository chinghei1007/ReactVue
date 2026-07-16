export interface CalligraphyCompetition {
  chineseName: string;
  englishName: string;
  result: string | string[];
  resultDate: string;
  style: string;
}

export interface CompetitionTableData extends CalligraphyCompetition {
  id: number;
  year: number;
  halfYear: string;
  formattedResult: string;
  formattedDate: string;
}

export type SortField = 'chineseName' | 'englishName' | 'formattedDate' | 'style' | 'formattedResult' | 'year' | 'halfYear';
export type SortDirection = 'asc' | 'desc';

export interface FilterOptions {
  style?: string;
  year?: number;
  halfYear?: string;
  searchQuery?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
}
