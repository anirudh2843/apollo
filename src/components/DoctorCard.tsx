
import React from "react";
import { Doctor } from "../types/doctor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-4 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-2">
            <img
              src={doctor.profilePic || "https://via.placeholder.com/150"}
              alt={`Dr. ${doctor.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-bold text-lg">{doctor.name}</h3>
          <p className="text-sm text-gray-600">{doctor.specialty}</p>
          <div className="flex items-center mt-2">
            <div className="bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded text-xs flex items-center">
              <span className="mr-1">★</span>
              {doctor.rating}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({doctor.reviewCount} reviews)
            </span>
          </div>
        </div>

        <CardContent className="md:w-2/3 p-4 pt-0 md:pt-4">
          <div className="md:flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold">Qualification:</span> {doctor.qualification}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold">Experience:</span> {doctor.experience} years
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold">Hospital:</span> {doctor.hospital}, {doctor.location}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold">Languages:</span> {doctor.languages.join(", ")}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold">Consultation Fee:</span>{" "}
                <span className="text-medical-primary font-semibold">₹{doctor.consultationFee}</span>
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold">Available:</span>{" "}
                {doctor.availability.join(", ")}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-3 line-clamp-3">{doctor.about}</p>
        </CardContent>
      </div>
      <CardFooter className="bg-gray-50 p-4 flex justify-between">
        <Button variant="outline">View Profile</Button>
        <Button className="bg-medical-primary hover:bg-medical-dark">Book Appointment</Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
