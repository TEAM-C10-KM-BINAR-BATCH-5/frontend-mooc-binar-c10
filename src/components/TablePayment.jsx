import { useState, useEffect } from "react";
import { Funnel } from "@phosphor-icons/react/dist/ssr";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Pagination from "./Pagination";
import { getDataTransaction } from "../libs/api";
import { formatDate } from "../../utils/TimeFormater";

function Table() {
  const [transaction, setTransaction] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchDataTransaction = async () => {
      const dataTransaction = await getDataTransaction();
      setTransaction(dataTransaction);
    };
    fetchDataTransaction();
  }, []);

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transaction.slice(indexOfFirstItem, indexOfLastItem);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                  Kategori
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Kelas Premium
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Status
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Metode Pembayaran
                </td>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Tanggal Bayar
                </td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order) => (
                <tr key={order.id}>
                  <td className="p-3 text-sm text-gray-700 ">
                    {order.User.name}
                  </td>
                  <td className="p-3 text-sm text-gray-700 ">
                    {order.Course.Category.name}
                  </td>
                  <td className="p-3 text-sm text-gray-700 ">
                    {order.Course.title}
                  </td>
                  <td className="p-3 text-sm text-gray-700 ">{order.status}</td>
                  <td className="p-3 text-sm text-gray-700 ">
                    {order.payment_type}
                  </td>
                  <td className="p-3 text-sm text-gray-700 ">
                    {formatDate(order.updatedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          {transaction.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={transaction.length}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Table;
