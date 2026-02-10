import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/slices/productSlice";

function ProductList() {
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProducts()); 
  }, [dispatch]);

  console.log(products);


  return (
    <div>
      
    
    </div>
  );
}

export default ProductList;
