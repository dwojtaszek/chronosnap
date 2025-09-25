export interface HistoricalImage {
  eraKey: string;
  src: string;
}

export type Continent = 'North America' | 'Europe' | 'Asia';

export interface Era {
  key: string;
  englishName: string;
}

export interface GenerationStatus {
  status: 'pending' | 'loading' | 'done' | 'error';
  image: HistoricalImage | null;
  error?: string;
  era: Era & { continent: Continent };
}