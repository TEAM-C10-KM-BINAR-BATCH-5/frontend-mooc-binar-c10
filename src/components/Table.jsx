import React from "react";
import { recentOrderData } from "../libs/Table-dummy-data";
// data sementara

function Table() {
  return (
    <div className="px-4 pt-3 pb-4 rounded-sm  border flex-1">
      <strong>Status Pembayaran</strong>
      <div className="mt-3">
        <table className="w-full">
          <thead>
            <tr className=" bg-blue-100">
              <td>ID</td>
              <td>Product ID</td>
              <td>Customer Name</td>
              <td>Order Date</td>
              <td>Order Total</td>
              <td>Shipping Address</td>
              <td>Order Status</td>
            </tr>
          </thead>
          <tbody>
            {recentOrderData.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.product_id}</td>
                <td>{order.customer_name}</td>
                <td>{order.order_date}</td>
                <td>{order.order_total}</td>
                <td>{order.shipment_address}</td>
                <td>{order.current_order_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
