import React from "react";

const TableVentas = ({ product }) => {
  return (
    <tbody>
      <tr className="bg-purple/50 ">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-black whitespace-nowrap"
        >
          {product.userName}
        </th>
        <td className="px-6 py-4 text-black">{product.productName}</td>
        <td className="px-6 py-4 text-black">{product.purchase.price}</td>
        <td className="px-6 py-4 text-black">{product.purchase.quantity}</td>
      </tr>
    </tbody>
  );
};

export default TableVentas;
