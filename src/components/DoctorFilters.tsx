
import React, { useState } from "react";
import { FilterOptions } from "../types/doctor";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface DoctorFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
}

const DoctorFilters: React.FC<DoctorFiltersProps> = ({ onFilterChange, className }) => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
    setShowMobileFilters(false);
  };

  const handleResetFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Location Filter */}
      <div>
        <h3 className="font-medium mb-3 text-gray-900">Location</h3>
        <div className="space-y-2">
          {["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune"].map(
            (location) => (
              <div className="flex items-center space-x-2" key={location}>
                <Checkbox 
                  id={`location-${location}`} 
                  checked={filters.location === location}
                  onCheckedChange={() => handleFilterChange("location", filters.location === location ? undefined : location)}
                />
                <Label htmlFor={`location-${location}`} className="text-sm">
                  {location}
                </Label>
              </div>
            )
          )}
        </div>
      </div>

      {/* Consultation Fee Filter */}
      <div>
        <h3 className="font-medium mb-3 text-gray-900">Consultation Fee</h3>
        <div className="px-2">
          <Slider 
            defaultValue={[0]} 
            max={2000} 
            step={100}
            onValueChange={(value) => handleFilterChange("consultationFeeMax", value[0])}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>₹0</span>
            <span>₹{filters.consultationFeeMax || 2000}</span>
          </div>
        </div>
      </div>

      {/* Experience Filter */}
      <div>
        <h3 className="font-medium mb-3 text-gray-900">Experience</h3>
        <RadioGroup defaultValue={filters.experience?.toString()}>
          {[0, 5, 10, 15, 20].map((years) => (
            <div className="flex items-center space-x-2" key={years}>
              <RadioGroupItem 
                value={years.toString()} 
                id={`experience-${years}`} 
                onClick={() => handleFilterChange("experience", years)}
              />
              <Label htmlFor={`experience-${years}`} className="text-sm">
                {years === 0 ? 'Any' : `${years}+ Years`}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Availability Filter */}
      <div>
        <h3 className="font-medium mb-3 text-gray-900">Availability</h3>
        <div className="space-y-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div className="flex items-center space-x-2" key={day}>
              <Checkbox 
                id={`day-${day}`} 
                checked={filters.availability === day}
                onCheckedChange={() => handleFilterChange("availability", filters.availability === day ? undefined : day)}
              />
              <Label htmlFor={`day-${day}`} className="text-sm">{day}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Hospitals Filter */}
      <div>
        <h3 className="font-medium mb-3 text-gray-900">Hospital</h3>
        <div className="space-y-2">
          {["Apollo Hospital", "Max Healthcare", "Fortis Hospital", "KIMS Hospital", "Ruby Hall Clinic"].map(
            (hospital) => (
              <div className="flex items-center space-x-2" key={hospital}>
                <Checkbox 
                  id={`hospital-${hospital}`} 
                  checked={filters.hospital === hospital}
                  onCheckedChange={() => handleFilterChange("hospital", filters.hospital === hospital ? undefined : hospital)}
                />
                <Label htmlFor={`hospital-${hospital}`} className="text-sm">
                  {hospital}
                </Label>
              </div>
            )
          )}
        </div>
      </div>

      {/* Sort by filter */}
      <div>
        <h3 className="font-medium mb-3 text-gray-900">Sort By</h3>
        <RadioGroup defaultValue={filters.sortBy}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="rating" 
              id="sort-rating" 
              onClick={() => handleFilterChange("sortBy", "rating")}
            />
            <Label htmlFor="sort-rating" className="text-sm">Rating (High to Low)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="experience" 
              id="sort-experience" 
              onClick={() => handleFilterChange("sortBy", "experience")}
            />
            <Label htmlFor="sort-experience" className="text-sm">Experience (High to Low)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              value="consultationFee" 
              id="sort-fee" 
              onClick={() => {
                handleFilterChange("sortBy", "consultationFee");
                handleFilterChange("sortOrder", "asc");
              }}
            />
            <Label htmlFor="sort-fee" className="text-sm">Fee (Low to High)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="pt-2 space-y-2">
        <Button 
          onClick={handleApplyFilters} 
          className="w-full bg-medical-primary hover:bg-medical-dark"
        >
          Apply Filters
        </Button>
        <Button 
          variant="outline" 
          onClick={handleResetFilters} 
          className="w-full"
        >
          Clear All
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <Button 
          variant="outline" 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex justify-between items-center"
        >
          <span>Filters</span>
          <Filter size={16} />
        </Button>
      </div>
      
      {/* Mobile filters */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white h-[90vh] w-full absolute bottom-0 rounded-t-xl p-4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowMobileFilters(false)}
              >
                ✕
              </Button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
      
      {/* Desktop filters */}
      <div className={`hidden md:block ${className}`}>
        <div className="bg-white rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4">Filter Doctors</h2>
          {filterContent}
        </div>
      </div>
    </>
  );
};

export default DoctorFilters;
