import React from "react";

const NoWorkshopFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <img
        src="/assets/img/no-results.png"
        alt="No Workshop"
        className="w-40 h-40 mb-6"
      />
      <h1 className="text-2xl font-semibold text-gray-800">
        No Workshop Found
      </h1>
      <p className="text-gray-600 mt-2">
        We couldn’t find any workshops at the moment. Please check back later.
      </p>
    </div>
  );
};

export default NoWorkshopFound;
