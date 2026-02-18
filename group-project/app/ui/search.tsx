"use client";

import { useState } from "react";
import { seedProductItems } from "../lib/data";
import {Card} from "./product-card";

export default function ProductFilter() {
  const [selectedCreator, setSelectedCreator] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")

  const creators = ["all", ...new Set(seedProductItems.map(item => item.creatorName))]
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under $40", value: "under40" },
    { label: "$40–$60", value: "40to60" },
    { label: "Over $60", value: "over60" },
  ];

  const filteredItems = seedProductItems.filter(item => selectedCreator === "all" || item.creatorName === selectedCreator)
    .filter(item => {
    if (selectedPrice === "all") return true;
    if (selectedPrice === "under40") return item.price < 40;
    if (selectedPrice === "40to60") return item.price >= 40 && item.price <= 60;
    if (selectedPrice === "over60") return item.price > 60;

  })
  return (
    <div>
      {/* Creator Drop Down */}
      <label htmlFor="dropDown">Creator:</label>
      <select
        value={selectedCreator}
        onChange={(e) => setSelectedCreator(e.target.value)}
      >
        {creators.map((creator) => (
          <option key={creator} value={creator}>
            {creator === "all" ? "All Creators" : creator}
          </option>
        ))}
      </select>

      {/* Price DropDown */}
      <label htmlFor="dropDown">Price:</label>
      <select
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
      >
        {priceRanges.map((range) => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>

      <div className="product-grid">
        {filteredItems.map((product, index) => {
          return (
            <Card
              key={index}
              image={product.imageUrl}
              product_name={product.productName}
              seller={product.creatorName}
              description={product.description}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
}
