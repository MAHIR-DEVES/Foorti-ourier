'use client'
import { useState } from "react";

const products = [
  {
    image: "🟥",
    name: "T-Shirt",
    category: "Fashion",
    size: "M",
    weight: ".2kg",
    purchasePrice: "1250 TK",
    salePrice: "1550 TK",
    sku: "TS561",
    quantity: 200,
    stockValue: "125045 TK",
    status: "Pending",
  },
  {
    image: "🟨",
    name: "T-Shirt",
    category: "Fashion",
    size: "M",
    weight: ".2kg",
    purchasePrice: "1250 TK",
    salePrice: "1550 TK",
    sku: "TS562",
    quantity: 10,
    stockValue: "125045 TK",
    status: "Active",
  },
  {
    image: "⬜",
    name: "T-Shirt",
    category: "Fashion",
    size: "M",
    weight: ".2kg",
    purchasePrice: "1250 TK",
    salePrice: "1550 TK",
    sku: "TS563",
    quantity: 200,
    stockValue: "125045 TK",
    status: "Active",
  },
  {
    image: "🟩",
    name: "T-Shirt",
    category: "Fashion",
    size: "M",
    weight: ".2kg",
    purchasePrice: "1250 TK",
    salePrice: "1550 TK",
    sku: "TS564",
    quantity: 200,
    stockValue: "125045 TK",
    status: "Pending",
  },
  {
    image: "🟥",
    name: "T-Shirt",
    category: "Fashion",
    size: "M",
    weight: ".2kg",
    purchasePrice: "1250 TK",
    salePrice: "1550 TK",
    sku: "TS565",
    quantity: 0,
    stockValue: "0 TK",
    status: "Active",
  },
];

export default function AddProductList() {
  const [selected, setSelected] = useState([]);
  const allChecked = selected.length === products.length;

  const toggleSelectAll = () => {
    if (allChecked) {
      setSelected([]);
    } else {
      setSelected(products.map((p) => p.sku));
    }
  };

  const toggleRow = (sku) => {
    setSelected((prev) =>
      prev.includes(sku) ? prev.filter((id) => id !== sku) : [...prev, sku]
    );
  };

  return (
    <div className="overflow-x-auto md:p-4">
      <table className="min-w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border text-center">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="p-2 border">Images</th>
            <th className="p-2 border">Product Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Size</th>
            <th className="p-2 border">Weight</th>
            <th className="p-2 border">Purchase Price</th>
            <th className="p-2 border">Sale Price</th>
            <th className="p-2 border">SKU</th>
            <th className="p-2 border">Quantity</th>
           
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr
              key={p.sku}
              className={
                p.quantity === 0
                  ? "bg-red-200"
                  : p.quantity < 50
                  ? "bg-yellow-100"
                  : ""
              }
            >
              <td className="p-2 border text-center">
                <input
                  type="checkbox"
                  checked={selected.includes(p.sku)}
                  onChange={() => toggleRow(p.sku)}
                />
              </td>
              <td className="p-2 border text-center">{p.image}</td>
              <td className="p-2 border">{p.name}</td>
              <td className="p-2 border">{p.category}</td>
              <td className="p-2 border">{p.size}</td>
              <td className="p-2 border">{p.weight}</td>
              <td className="p-2 border">{p.purchasePrice}</td>
              <td className="p-2 border">{p.salePrice}</td>
             
              <td className="p-2 border">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    p.status === "Active" ? "bg-green-500" : "bg-yellow-500"
                  }`}
                >
                  {p.status}
                </span>
              </td>
              <td className="p-2 border">...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
