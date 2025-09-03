import axios from "axios";
import React, { useEffect, useState } from "react";

const SchoolsPage = () => {
  const baseURL = "http://localhost:5000";
  const URL = "https://school-backend-mu.vercel.app";
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`${URL}/api/schools`);
      console.log("Base URL:", URL);
      console.log(response);
      setData(response.data);
    };
    getData();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/300x200?text=No+Image";
    if (imagePath.startsWith("http")) return imagePath;
    return `${URL}/schoolImages/${imagePath}`;
  };

  return (
    <div className="min-h-screen  text-white font-sans overflow-x-hidden relative">
      <div className="gradient-background">
        <div className="gradient-shape shape-1"></div>
        <div className="gradient-shape shape-2"></div>
      </div>

      <div className="container mx-px-4 py-8 relative z-10">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-blue-300 to-yellow-200 bg-clip-text text-transparent">
            Find the Perfect School
          </h1>
         <p className="text-xl text-gray-300 ">
            Discover the best educational institutions  for your child's future
          </p>
        </header>
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 mt-6 ">
          {data.length > 0 ? (
            data.map((school) => (
              <div
                key={school.id}
                className="bg-gray-700 bg-opacity-70 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700 transition-transform hover:scale-105 hover:shadow-xl h-[342px]"
              >
                <div className="h-50 overflow-hidden">
                  <img
                    src={getImageUrl(school.image)}
                    alt={school.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start  mb-4">
                    <h3 className="text-2xl font-bold text-white ">
                      {school.name}
                    </h3>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center text-gray-300 mb-2">
                      <i className="fas fa-map-marker-alt mr-2 w-5"></i>
                      <span>
                        {school.address}, {school.city}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-300 mb-2">
                      <i className="fas fa-phone mr-2 w-5"></i>
                      <span>{school.city}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button className="btn btn-primary py-2 px-4 text-sm">
                      <i className="fas fa-eye mr-2"></i> View Details
                    </button>
                    <button className="btn btn-secondary py-2 px-4 text-sm">
                      <i className="fas fa-heart mr-2"></i> Save
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <i className="fas fa-school text-5xl text-gray-500 mb-4"></i>
              <h3 className="text-2xl font-bold text-gray-400">
                No schools found
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolsPage;
