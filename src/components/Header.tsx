
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, User } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and main navigation */}
          <div className="flex items-center space-x-10">
            <a href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-medical-primary">
                Apollo
              </h1>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-medical-primary font-medium">
                Find Doctors
              </a>
              <a href="#" className="text-gray-700 hover:text-medical-primary font-medium">
                Video Consult
              </a>
              <a href="#" className="text-gray-700 hover:text-medical-primary font-medium">
                Medicines
              </a>
              <a href="#" className="text-gray-700 hover:text-medical-primary font-medium">
                Lab Tests
              </a>
            </nav>
          </div>

          {/* Search bar and user actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search doctors, specialties, clinics..." 
                className="pl-10 w-[300px]" 
              />
            </div>
            <Button variant="outline" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="hidden md:flex">
              <User className="mr-2 h-4 w-4" />
              Login
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Specialty Navigation Bar */}
      <div className="bg-medical-light">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex space-x-6 overflow-x-auto py-2 scrollbar-hide">
            <a href="#" className="text-medical-primary font-medium whitespace-nowrap px-2 py-1 border-b-2 border-medical-primary">
              General Physician
            </a>
            <a href="#" className="text-gray-600 font-medium whitespace-nowrap px-2 py-1 hover:text-medical-primary">
              Pediatrician
            </a>
            <a href="#" className="text-gray-600 font-medium whitespace-nowrap px-2 py-1 hover:text-medical-primary">
              Dermatologist
            </a>
            <a href="#" className="text-gray-600 font-medium whitespace-nowrap px-2 py-1 hover:text-medical-primary">
              Gynecologist
            </a>
            <a href="#" className="text-gray-600 font-medium whitespace-nowrap px-2 py-1 hover:text-medical-primary">
              Orthopedist
            </a>
            <a href="#" className="text-gray-600 font-medium whitespace-nowrap px-2 py-1 hover:text-medical-primary">
              Cardiologist
            </a>
            <a href="#" className="text-gray-600 font-medium whitespace-nowrap px-2 py-1 hover:text-medical-primary">
              Neurologist
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
