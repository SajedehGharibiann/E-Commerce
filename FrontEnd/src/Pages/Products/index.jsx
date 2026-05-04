import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../Utils/fetchData";

import ProductCard from "./ProductCard";
import SKProducts from "./SKProducts";
const initialState = {
  products: null,
  page: 1,
  sort: "-createdAt",
  price: [0, 10000],
  limit: 20,
  loading: true,
  count: 0,
};
const userAction = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCT_SUCCESS":
      return {
        ...state,
        count: action.payload.count,
        loading: false,
        products: action.payload.products,
      };
    case "PAGE":
      return {
        ...state,
        loading: true,
        products: null,
        page: action.payload,
      };
    case "SORT":
      return {
        ...state,
        loading: true,
        products: null,
        sort: action.payload,
      };
    case "LIMIT":
      return {
        ...state,
        loading: true,
        products: null,

        limit: action.payload,
      };
    case "PRICE":
      return {
        ...state,
        loading: true,
        products: null,
        price: action.payload,
      };
  }
};
export default function Product() {
  const { categoryId } = useParams();
  const [{ products, page, sort, price, limit, loading, count }, dispatch] =
    useReducer(userAction, initialState);

  useEffect(() => {
    (async () => {
      const response = await fetchData(
        `products?${categoryId == "all" ? "" : `categoryId=${categoryId}&`}
       `
      );
      console.log(response)
      dispatch({
        type: "GET_PRODUCT_SUCCESS",
        payload: { products: response.data, count: response.count },
      });
    })();
  }, [limit, price, sort, page, categoryId]);
  const skeletonLoading = new Array(20).fill(<SKProducts/>);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <select
          onChange={(e) => dispatch({ type: "SORT", payload: e.target.value })}
          className="px-3 py-2 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-300"
        >
          <option value="-createdAt">Newest</option>
          <option value="title">A–Z</option>
          <option value="-title">Z–A</option>
        </select>

        <select
          onChange={(e) => dispatch({ type: "LIMIT", payload: e.target.value })}
          className="px-3 py-2 border rounded-lg bg-white shadow-sm focus:ring focus:ring-blue-300"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">
            20
          </option>
        </select>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            Min Price:
            <input
              type="text"
              value={price[0]}
              onChange={(e) =>
                dispatch({
                  type: "PRICE",
                  payload: [e.target.value, price[1]],
                })
              }
              className="px-2 py-1 border rounded-md w-20"
            />
          </label>

          <label className="flex items-center gap-2 text-sm">
            Max Price:
            <input
              type="text"
              value={price[1]}
              onChange={(e) =>
                dispatch({
                  type: "PRICE",
                  payload: [price[0], e.target.value],
                })
              }
              className="px-2 py-1 border rounded-md w-20"
            />
          </label>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {loading && !products && skeletonLoading}

        {!loading &&
          products?.map((pr) => (
            <ProductCard
              key={pr._id}
              id={pr._id}
              title={pr.title}
              image={import.meta.env.VITE_FILE_URL + pr.images[0]}
              price={pr.defaultProductVariantId.price}
              priceAfterDiscount={pr.defaultProductVariantId.priceAfterDiscount}
              discountPercent={pr.defaultProductVariantId.discountPercent}
              categoryTitle={pr.categoryId?.title}
              brandTitle={pr.brandId?.title}
              avgRating={pr.avgRating}
            />
          ))}
      </div>

      {!loading && products?.length === 0 && (
        <p className="text-center text-gray-500 mt-8 text-lg">
          No products found.
        </p>
      )}
    </div>
  );
}
