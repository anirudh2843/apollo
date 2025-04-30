
export interface Doctor {
  id: string;
  name: string;
  profilePic: string;
  specialty: string;
  qualification: string;
  experience: number;
  location: string;
  hospital: string;
  consultationFee: number;
  rating: number;
  reviewCount: number;
  availability: string[];
  languages: string[];
  about: string;
}

export interface FilterOptions {
  specialty?: string;
  location?: string;
  experience?: number;
  availability?: string;
  consultationFeeMin?: number;
  consultationFeeMax?: number;
  rating?: number;
  language?: string;
  hospital?: string;
  sortBy?: 'rating' | 'experience' | 'consultationFee';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedDoctors {
  doctors: Doctor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
