import React from "react";
import { recentOrderData } from "../libs/Table-dummy-data";
import { Funnel } from "@phosphor-icons/react/dist/ssr";
import { MagnifyingGlass } from "@phosphor-icons/react";

function Table() {
  return (
    <>
      <div className="px-4 pt-3 pb-4 rounded-sm flex-1 whitespace-nowrap">
        <div className="flex flex-cols justify-between">
          <div className="flex items-center justify-center">
            <strong>Status Pembayaran</strong>
          </div>
          <div className=" flex flex-cols justify-end gap-2">
            <button
              type="button"
              className="border border-costumeBlue border-solid rounded-xl flex items-center px-2 p-0.5"
            >
              <Funnel
                size={24}
                weight="bold"
                className="mr-2 text-costumeBlue"
              />
              <span className="font-bold text-costumeBlue">Filter</span>
            </button>
            <button>
              <MagnifyingGlass
                size={24}
                className="text-costumeBlue"
                weight="bold"
              />
            </button>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border border-separate">
            <thead className="bg-blue-100 border-b-2 border-gray-200 ">
              <tr>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  ID
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Product ID
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Customer Name
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Order Date
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Order Total
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Shipping Address
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Order Status
                </td>
              </tr>
            </thead>
            <tbody>
              {recentOrderData.map((order) => (
                <tr key={order.id}>
                  <td className="p-3 text-sm text-gray-700 ">{order.id}</td>
                  <td className="p-3 text-sm text-gray-700 ">
                    {order.product_id}
                  </td>
                  <td className="p-3 text-sm text-gray-700 ">
                    {order.customer_name}
                  </td>
                  <td className="p-3 text-sm text-gray-700 ">
                    {order.order_date}
                  </td>
                  <td className="p-3 text-sm text-gray-700 ">
                    {order.order_total}
                  </td>
                  <td className="p-3 text-sm text-gray-700 ">
                    {order.shipment_address}
                  </td>
                  <td className="p-3 text-sm text-gray-700 ">
                    {order.current_order_status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
