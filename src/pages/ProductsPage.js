import React from "react";
import ProductTable from "../components/products/ProductTable";

const ProductsPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Manage Products</h1>
      <ProductTable />
    </div>
  );
};

export default ProductsPage;
