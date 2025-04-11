
export interface Schedule {
  id: string;
  openTime: string;
  closeTime?: string; // Optional as some attractions only have opening time
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  location: string;
  image?: string;
  schedules: Schedule[];
  createdAt: Date;
  updatedAt: Date;
}

export type AttractionFormData = Omit<Attraction, 'id' | 'createdAt' | 'updatedAt'>;

export interface TimeOption {
  value: string;
  label: string;
}
