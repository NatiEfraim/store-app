import React from "react";
import DrinkTable from "../components/drinks/DrinkTable";

const DrinkPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Manage Drinks</h1>
      <DrinkTable />
    </div>
  );
};

export default DrinkPage;
