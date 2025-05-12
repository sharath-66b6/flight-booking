import React from "react";
import { FiClock, FiCalendar, FiDollarSign } from "react-icons/fi";
import { MdAirplaneTicket, MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { IoMdPaperPlane } from "react-icons/io";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaRegSadTear } from "react-icons/fa";

const FlightSearchResults = ({ flights = [], loading = false }) => {
  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto mt-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700"></div>
        </div>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto mt-8">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <FaRegSadTear className="text-gray-400 text-6xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No flights found</h3>
          <p className="text-gray-500 mb-4">
            We couldn't find any flights matching your search criteria.
          </p>
          <p className="text-gray-500">
            Try adjusting your search parameters or selecting different dates.
          </p>
        </div>
      </div>
    );
  }

  // Function to format time (e.g., "14:30")
  const formatTime = (timeString) => {
    return timeString;
  };

  // Function to calculate flight duration display
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="max-w-[1400px] mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        <span className="flex items-center gap-2">
          <IoMdPaperPlane className="text-blue-500" />
          Available Flights ({flights.length})
        </span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {flights.map((flight) => (
          <div
            key={flight.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 
                      border border-gray-100 overflow-hidden hover:bg-gray-50 
                      hover:translate-y-[-4px] cursor-pointer"
          >
            <div className="p-5">
              {/* Airline & Flight Number */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={flight.airlineLogo}
                    alt={flight.airline}
                    className="h-10 w-10 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{flight.airline}</h3>
                    <p className="text-sm text-gray-500">{flight.flightNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                  <MdOutlineAirlineSeatReclineNormal className="text-blue-500" />
                  <span className="text-sm font-medium text-blue-700">{flight.flightType}</span>
                </div>
              </div>

              {/* Flight Times & Route */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">
                    {formatTime(flight.departureTime)}
                  </p>
                  <p className="text-sm text-gray-500">{flight.departureAirport}</p>
                </div>

                <div className="flex-1 mx-4 px-2">
                  <div className="relative flex items-center justify-center">
                    <div className="border-t-2 border-gray-300 border-dashed w-full"></div>
                    <div className="absolute">
                      <BiSolidPlaneAlt className="text-blue-500 text-xl" />
                    </div>
                  </div>
                  <p className="text-xs text-center mt-1 text-gray-500">
                    {formatDuration(flight.durationMinutes)}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">
                    {formatTime(flight.arrivalTime)}
                  </p>
                  <p className="text-sm text-gray-500">{flight.arrivalAirport}</p>
                </div>
              </div>

              {/* Flight Details & Price */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex gap-3">
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <FiCalendar />
                    <span>{flight.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <FiClock />
                    <span>{formatDuration(flight.durationMinutes)}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3">
                    <p className="text-lg font-bold text-blue-600">₹{flight.price}</p>
                    <p className="text-xs text-gray-500 text-right">per person</p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center gap-1">
                    <MdAirplaneTicket />
                    <span>Book</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock data for demonstration
export const mockFlights = [
  {
    id: "fl-001",
    airline: "IndiGo",
    airlineLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/IndiGo_Airlines_logo.svg/1200px-IndiGo_Airlines_logo.svg.png",
    flightNumber: "6E-2134",
    departureTime: "06:15",
    departureAirport: "DEL",
    arrivalTime: "08:45",
    arrivalAirport: "BOM",
    durationMinutes: 150,
    date: "12 May, 2025",
    price: 4299,
    flightType: "Economy"
  },
  {
    id: "fl-002",
    airline: "Air India",
    airlineLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Air_India_logo.svg/1200px-Air_India_logo.svg.png",
    flightNumber: "AI-865",
    departureTime: "09:30",
    departureAirport: "DEL",
    arrivalTime: "11:45",
    arrivalAirport: "BOM",
    durationMinutes: 135,
    date: "12 May, 2025",
    price: 5199,
    flightType: "Economy"
  },
  {
    id: "fl-003",
    airline: "Vistara",
    airlineLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Vistara-Logo.svg/1200px-Vistara-Logo.svg.png",
    flightNumber: "UK-995",
    departureTime: "14:20",
    departureAirport: "DEL",
    arrivalTime: "16:40",
    arrivalAirport: "BOM",
    durationMinutes: 140,
    date: "12 May, 2025",
    price: 5599,
    flightType: "Premium"
  },
  {
    id: "fl-004",
    airline: "SpiceJet",
    airlineLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/SpiceJet_logo.svg/1200px-SpiceJet_logo.svg.png",
    flightNumber: "SG-8169",
    departureTime: "17:45",
    departureAirport: "DEL",
    arrivalTime: "20:00",
    arrivalAirport: "BOM",
    durationMinutes: 135,
    date: "12 May, 2025",
    price: 3999,
    flightType: "Economy"
  }
];

export default FlightSearchResults;