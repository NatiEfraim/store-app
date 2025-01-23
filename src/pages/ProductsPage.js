import React from "react";
import ProductTable from "../components/products/ProductTable";

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Product Management
        </h1>
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductsPage;