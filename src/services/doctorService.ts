
import { Doctor, FilterOptions, PaginatedDoctors } from "../types/doctor";

// Mock data for doctors
const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Aditya Sharma",
    profilePic: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    specialty: "General Physician",
    qualification: "MBBS, MD (Internal Medicine)",
    experience: 15,
    location: "Mumbai",
    hospital: "Apollo Hospital",
    consultationFee: 800,
    rating: 4.8,
    reviewCount: 235,
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    languages: ["English", "Hindi"],
    about: "Dr. Aditya Sharma is a highly experienced General Physician with over 15 years of practice. Specializing in internal medicine, he provides comprehensive care for a wide range of conditions."
  },
  {
    id: "2",
    name: "Dr. Priya Patel",
    profilePic: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2187&auto=format&fit=crop",
    specialty: "General Physician",
    qualification: "MBBS, DNB (Family Medicine)",
    experience: 8,
    location: "Delhi",
    hospital: "Max Healthcare",
    consultationFee: 700,
    rating: 4.5,
    reviewCount: 178,
    availability: ["Mon", "Wed", "Fri"],
    languages: ["English", "Hindi", "Gujarati"],
    about: "Dr. Priya Patel is a dedicated General Physician with expertise in family medicine. She focuses on preventive care and managing chronic health conditions."
  },
  {
    id: "3",
    name: "Dr. Vikram Singh",
    profilePic: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
    specialty: "Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine), DM (Gastroenterology)",
    experience: 20,
    location: "Bangalore",
    hospital: "Fortis Hospital",
    consultationFee: 1200,
    rating: 4.9,
    reviewCount: 310,
    availability: ["Tue", "Thu", "Sat"],
    languages: ["English", "Hindi", "Kannada"],
    about: "Dr. Vikram Singh is a senior consultant with specialization in internal medicine and gastroenterology. He has extensive experience in treating complex medical conditions."
  },
  {
    id: "4",
    name: "Dr. Ananya Gupta",
    profilePic: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
    specialty: "General Physician",
    qualification: "MBBS, DCH",
    experience: 5,
    location: "Chennai",
    hospital: "Apollo Hospital",
    consultationFee: 600,
    rating: 4.3,
    reviewCount: 89,
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    languages: ["English", "Tamil", "Hindi"],
    about: "Dr. Ananya Gupta is a compassionate General Physician with special interest in pediatric care. She provides family-centered medical services for patients of all ages."
  },
  {
    id: "5",
    name: "Dr. Suresh Kumar",
    profilePic: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop",
    specialty: "Internal Medicine",
    qualification: "MBBS, MD (Internal Medicine), FCCP",
    experience: 18,
    location: "Hyderabad",
    hospital: "KIMS Hospital",
    consultationFee: 1000,
    rating: 4.7,
    reviewCount: 203,
    availability: ["Mon", "Wed", "Fri", "Sat"],
    languages: ["English", "Telugu", "Hindi"],
    about: "Dr. Suresh Kumar is an expert in internal medicine with fellowship training in pulmonology. He specializes in respiratory disorders and critical care medicine."
  },
  {
    id: "6",
    name: "Dr. Meera Shah",
    profilePic: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1974&auto=format&fit=crop",
    specialty: "General Physician",
    qualification: "MBBS, DNB (General Medicine)",
    experience: 10,
    location: "Pune",
    hospital: "Ruby Hall Clinic",
    consultationFee: 750,
    rating: 4.6,
    reviewCount: 142,
    availability: ["Tue", "Thu", "Sat"],
    languages: ["English", "Marathi", "Hindi"],
    about: "Dr. Meera Shah is known for her patient-centered approach to general medicine. She specializes in managing chronic diseases and promoting overall wellness."
  }
];

// Function to filter doctors based on criteria
const filterDoctors = (doctors: Doctor[], filters: FilterOptions): Doctor[] => {
  return doctors.filter(doctor => {
    if (filters.specialty && doctor.specialty !== filters.specialty) return false;
    if (filters.location && doctor.location !== filters.location) return false;
    if (filters.experience && doctor.experience < filters.experience) return false;
    if (filters.availability && !doctor.availability.includes(filters.availability)) return false;
    if (filters.consultationFeeMin && doctor.consultationFee < filters.consultationFeeMin) return false;
    if (filters.consultationFeeMax && doctor.consultationFee > filters.consultationFeeMax) return false;
    if (filters.rating && doctor.rating < filters.rating) return false;
    if (filters.language && !doctor.languages.includes(filters.language)) return false;
    if (filters.hospital && doctor.hospital !== filters.hospital) return false;
    return true;
  });
};

// Function to sort doctors based on criteria
const sortDoctors = (doctors: Doctor[], sortBy?: 'rating' | 'experience' | 'consultationFee', sortOrder?: 'asc' | 'desc'): Doctor[] => {
  if (!sortBy) return doctors;
  
  return [...doctors].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];
    
    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });
};

// Mock API call to get doctors with filtering and pagination
export const getDoctors = async (
  page: number = 1,
  limit: number = 10,
  filters: FilterOptions = {}
): Promise<PaginatedDoctors> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredDoctors = filterDoctors(mockDoctors, filters);
  const total = filteredDoctors.length;
  const totalPages = Math.ceil(total / limit);
  
  // Sort the doctors if requested
  if (filters.sortBy) {
    filteredDoctors = sortDoctors(filteredDoctors, filters.sortBy, filters.sortOrder);
  }
  
  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, total);
  const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);
  
  return {
    doctors: paginatedDoctors,
    total,
    page,
    limit,
    totalPages
  };
};

// Mock API call to add a new doctor
export const addDoctor = async (doctor: Omit<Doctor, 'id'>): Promise<Doctor> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate a new ID
  const newId = (mockDoctors.length + 1).toString();
  
  // Create the new doctor
  const newDoctor: Doctor = {
    id: newId,
    ...doctor
  };
  
  // In a real API, this would add to the database
  // Here we're just returning the new doctor
  return newDoctor;
};
