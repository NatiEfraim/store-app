import React from "react";
import CategoryTable from "../components/categories/CategoryTable";

const CategoriesPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Manage Categories</h1>
      <CategoryTable />
    </div>
  );
};

export default CategoriesPage;
