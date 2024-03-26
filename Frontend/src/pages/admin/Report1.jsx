import React from "react";

const Report1 = ({ product }) => {
  return (
    <tbody>
      <tr className="bg-darkPurple/20 ">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-black whitespace-nowrap"
        >
          {product.userName}
        </th>
        <td className="px-6 py-4 text-black">{product.productName}</td>
        <td className="px-6 py-4 text-black">{product.price}</td>
        <td className="px-6 py-4 text-black">{product.quantity}</td>
        <td className="px-6 py-4 text-black">{product.vendorName}</td>
        <td className="px-6 py-4 text-black">{product.date}</td>
      </tr>
    </tbody>
  );
};

export default Report1;
