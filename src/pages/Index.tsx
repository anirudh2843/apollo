import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import DoctorCard from "../components/DoctorCard";
import DoctorFilters from "../components/DoctorFilters";
import Pagination from "../components/Pagination";
import { getDoctors } from "../services/doctorService";
import { FilterOptions, PaginatedDoctors } from "../types/doctor";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [doctorData, setDoctorData] = useState<PaginatedDoctors | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({});

  useEffect(() => {
    fetchDoctors();
  }, [currentPage, filters]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const data = await getDoctors(currentPage, 3, filters);
      setDoctorData(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast({
        title: "Error",
        description: "Failed to fetch doctors. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-y-auto">
      <Header />

      <div className="container max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            General Physician & Internal Medicine Specialists
          </h1>
          <p className="text-gray-600 mt-1">
            Book appointments with the best General Physicians and Internal Medicine Specialists
          </p>
        </div>

        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6">
          <span>Home</span> &gt; <span>Find Doctors</span> &gt;{" "}
          <span className="text-medical-primary">General Physician</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <DoctorFilters onFilterChange={handleFilterChange} className="md:w-1/4 mb-6" />

          {/* Doctor listings */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <div className="animate-pulse text-medical-primary">
                  Loading doctors...
                </div>
              </div>
            ) : doctorData && doctorData.doctors.length > 0 ? (
              <>
                <div className="mb-4 flex flex-wrap justify-between items-center">
                  <p className="text-gray-600">
                    Showing {doctorData.doctors.length} of {doctorData.total} doctors
                  </p>
                </div>

                <div className="space-y-4">
                  {doctorData.doctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>

                {doctorData.totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={doctorData.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium text-gray-900">
                  No doctors found
                </h3>
                <p className="mt-2 text-gray-500">
                  Try adjusting your filters to find more doctors.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Footer */}
      <div className="mt-auto bg-white py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">
            Find the Best General Physicians in India
          </h2>
          <p className="text-gray-600 mb-4">
            Looking for the best general physicians in India? DoctorFinder helps you find qualified and experienced general physicians and internal medicine specialists across major cities including Mumbai, Delhi, Bangalore, Hyderabad, Chennai, and Pune. Book in-clinic appointments or video consultations with just a few clicks.
          </p>
          <p className="text-gray-600 mb-4">
            General physicians are medical doctors who diagnose and treat a wide range of health conditions and diseases. They provide primary healthcare services and refer patients to specialists when needed. Internal medicine specialists focus on the prevention, diagnosis, and treatment of adult diseases.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            © 2025 Apollo. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
