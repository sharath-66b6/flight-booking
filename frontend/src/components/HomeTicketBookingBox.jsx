import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlightSearchResults, { mockFlights } from "./FlightSearchResults";

const HomeTicketBookingBox = () => {
  const navigate = useNavigate();

  // State variables
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [flightType, setFlightType] = useState('Economy');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    // In a real app, you would fetch data from an API here
    // For now, we'll simulate a search with our mock data
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
    const formattedFrom = from.trim().charAt(0).toUpperCase() + from.trim().slice(1).toLowerCase();
    const formattedTo = to.trim().charAt(0).toUpperCase() + to.trim().slice(1).toLowerCase();
      
      // Filter mock flights based on search criteria
      // In a real app, this would be handled by your backend
      const filteredFlights = mockFlights.filter(flight => {
        const matchesType = flight.flightType === flightType;
        // For demo purposes, we'll just check if the input strings are contained in the airports
        const matchesFrom = formattedFrom && flight.departureAirport.includes(formattedFrom.substring(0, 3).toUpperCase());
        const matchesTo = formattedTo && flight.arrivalAirport.includes(formattedTo.substring(0, 3).toUpperCase());
        
        return matchesType && (formattedFrom === '' || matchesFrom) && (formattedTo === '' || matchesTo);
      });
      
      setSearchResults(filteredFlights);
      setLoading(false);
    }, 1000);
  };

  const navToSearchPage = () => {
    const formattedFrom = from.trim().charAt(0).toUpperCase() + from.trim().slice(1).toLowerCase();
    const formattedTo = to.trim().charAt(0).toUpperCase() + to.trim().slice(1).toLowerCase();
    navigate(`/search?from=${formattedFrom}&to=${formattedTo}&departDate=${departDate}&flightType=${flightType}`);
};

  return (
    <>
      <div className="py-[50px] max-w-[1400px] mx-auto">
        <div className="flex flex-col ">
          <div className="flex gap-5 items-center justify-start mb-5">
            <div className="flex justify-center items-center gap-2">
              <input type="radio" name="ticketType" id="oneWay" defaultChecked />
              <label htmlFor="oneWay">One way</label>
            </div>
            <div className="flex justify-center items-center gap-2">
              <input type="radio" name="ticketType" id="return" />
              <label htmlFor="return">Return</label>
            </div>
          </div>
          <div className="flex justify-between gap-5 flex-col xl:flex-row">
            <div className="flex gap-5 border-[1px] max-w-full xl:max-w-fit border-gray-300 rounded-[20px] flex-col xl:flex-row">
              <div className="flex flex-col p-5 pb-0 xl:pr-0">
                <h1>From</h1>
                <input
                  name="from"
                  type="text"
                  placeholder="Delhi"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="outline-none text-[30px] max-w-[300px]"
                />
              </div>
              <div className="flex flex-col p-5 border-t-[1px] xl:border-l-[1px] xl:border-t-0 border-gray-300">
                <h1>To</h1>
                <input
                  name="to"
                  type="text"
                  placeholder="Mumbai"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="outline-none text-[30px] max-w-[300px]"
                />
              </div>
            </div>
            <div className="flex gap-5 border-[1px] border-gray-300 rounded-[20px]">
              <div className="flex flex-col p-5">
                <h1>Departure Date</h1>
                <input
                  name="departDate"
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="outline-none text-[20px] sm:text-[30px] w-full"
                />
              </div>
            </div>
            <div className="flex gap-5 border-[1px] flex-1 border-gray-300 rounded-[20px] flex-col xl:flex-row">
              <div className="flex flex-col p-5 w-full">
                <h1>Flight Type</h1>
                <select
                  name="flightType"
                  id="flightType"
                  value={flightType}
                  onChange={(e) => setFlightType(e.target.value)}
                  className="w-full text-xl mt-3 outline-none border-none"
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium">Premium</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="hover:bg-[#1E293B] bg-[#bebebe] text-black hover:text-white px-5 py-2 mt-5 rounded-lg transition duration-100"
            onClick={navToSearchPage}
          >
            Go to Search Page
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 mt-5 rounded-lg transition duration-200"
            onClick={handleSearch}
          >
            Search Flights
          </button>
        </div>
      </div>
      
      {/* Display flight search results */}
      {(searchResults !== null || loading) && (
        <FlightSearchResults flights={searchResults || []} loading={loading} />
      )}
    </>
  );
};

export default HomeTicketBookingBox;
