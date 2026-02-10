import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct } from "../redux/slices/productSlice";
import { addToBasket } from "../redux/slices/basketSlice";
import Loading from "./Loading";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const { products, selectedProduct, loading } = useSelector(
    (state) => state.product,
  );

  useEffect(() => {
    if (!products.length) return;

    const product = products.find((p) => p.id === Number(id));

    if (product) {
      dispatch(setSelectedProduct(product));
    }

    return () => {
      dispatch(setSelectedProduct(null));
    };
  }, [id, products, dispatch]);

  if (loading || !selectedProduct?.id) {
    return <Loading />;
  }

  const { title, price, image, description } = selectedProduct;

  const addBasket = () => {
    dispatch(
      addToBasket({
        ...selectedProduct,
        quantity: count,
      }),
    );
  };

  return (
    <div
      className="flex-row"
      style={{
        border: "1px solid #ddd",
        borderRadius: 15,
        margin: 10,
        padding: 20,
      }}
    >
      <img src={image} alt={title} width={250} style={{ padding: 10 }} />

      <div style={{ margin: 30 }}>
        <h1>{title}</h1>

        <p style={{ fontSize: 15, lineHeight: 2 }}>{description}</p>

        <strong style={{ fontSize: 50, color: "red" }}>{price} €</strong>

        <div
          style={{
            fontSize: 40,
            display: "flex",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <CiCircleMinus
            onClick={() => count > 0 && setCount((prev) => prev - 1)}
            style={{ cursor: "pointer" }}
          />

          <span style={{ margin: "0 15px", fontSize: 30 }}>{count}</span>

          <CiCirclePlus
            onClick={() => count < 5 && setCount((prev) => prev + 1)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <button
          onClick={addBasket}
          disabled={count === 0}
          style={{
            cursor: count === 0 ? "not-allowed" : "pointer",
            fontSize: 20,
            padding: "10px 20px",
            borderRadius: 20,
            color: "white",
            backgroundColor: count === 0 ? "gray" : "red",
            border: "none",
            marginTop: 20,
          }}
        >
          Add to basket
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
