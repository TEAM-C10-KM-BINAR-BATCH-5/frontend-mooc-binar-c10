import { useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { Funnel } from "@phosphor-icons/react/dist/ssr";
import { ArrowsClockwise, MagnifyingGlass } from "@phosphor-icons/react";
import { getDataTransaction } from "../libs/api";
import { formatDate } from "../../utils/TimeFormater";
import { triggerDataUpdateState } from "../atom/formAtom";
import Pagination from "./Pagination";
import FilterMenu from "./FilterMenu";
import {
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import FilterButton from "./FilterButton";
import SearchButton from "./SearchButton";
import { paymentFilterState } from "../atom/paymentAtom";

const status = [
  "capture",
  "settlement",
  "pending",
  "cancel",
  "expire",
  "failure",
];

const method = ["midtrans", "bank_transfer", "gopay", "cstore", "credit_card"];

function Table() {
  const [triggerDataUpdate] = useRecoilState(triggerDataUpdateState);
  const [transaction, setTransaction] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [paymentFilter, setPaymentFilter] = useRecoilState(paymentFilterState);
  const resetPaymentFilter = useResetRecoilState(paymentFilterState);

  useEffect(() => {
    const fetchDataTransaction = async () => {
      const dataTransaction = await getDataTransaction(paymentFilter);
      console.log(dataTransaction);
      setTransaction(dataTransaction);
      setSearch(dataTransaction);
      setLoading(false);
    };
    fetchDataTransaction();
  }, [triggerDataUpdate, paymentFilter]);

  // pagination
  useEffect(() => {
    setCurrentPage(1); // Set currentPage kembali ke halaman pertama saat search berubah
  }, [search]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = search.slice(indexOfFirstItem, indexOfLastItem);
  search.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    Search(searchTerm);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPaymentFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Search = (searchTerm) => {
    const filteredResults = transaction.filter(
      (order) =>
        order.User.name.toLowerCase().includes(searchTerm) ||
        order.Course.title.toLowerCase().includes(searchTerm)
    );
    setSearch(filteredResults);
  };

  return (
    <>
      <div className="px-4 pt-3 pb-4 rounded-sm flex-1 whitespace-nowrap">
        <div className="flex flex-cols justify-between">
          <div className="flex items-center justify-center">
            <strong>Status Pembayaran</strong>
          </div>
          <div className=" flex flex-cols justify-end gap-2">
            <Menu>
              <MenuHandler>
                <div>
                  <FilterButton />
                </div>
              </MenuHandler>
              <MenuList className="border border-gray-400 p-1">
                <div className="flex flex-row-reverse justify-start items-center gap-3 m-3">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      resetPaymentFilter();
                    }}
                    className="bg-transparent border-2 border-costumeBlue text-costumeBlue opacity-50 rounded-lg p-2"
                  >
                    <ArrowsClockwise size={15} weight="bold" />
                  </Button>
                  <FilterMenu title={"Metode"}>
                    {method.map((method) => {
                      return (
                        <MenuItem className="flex flex-row items-center gap-2 cursor-default">
                          {" "}
                          <input
                            type="radio"
                            name="paymentType"
                            value={method}
                            className="cursor-pointer"
                            checked={
                              paymentFilter.paymentType == method ? true : false
                            }
                            onChange={handleInputChange}
                          />
                          <span>{method}</span>
                        </MenuItem>
                      );
                    })}
                  </FilterMenu>

                  <FilterMenu title={"Status"}>
                    {status.map((status) => {
                      return (
                        <MenuItem className="flex flex-row items-center gap-2 cursor-default">
                          {" "}
                          <input
                            value={status}
                            type="radio"
                            name="status"
                            className="cursor-pointer"
                            onClick={handleInputChange}
                            checked={
                              paymentFilter.status == status ? true : false
                            }
                          />
                          <span>{status}</span>
                        </MenuItem>
                      );
                    })}
                  </FilterMenu>
                </div>
              </MenuList>
            </Menu>
            <SearchButton>
              <Input
                value={searchTerm}
                onChange={handleSearchChange}
                label="Cari nama user dan kelas"
                color="indigo"
                containerProps={{
                  className: "mb-1",
                }}
              />
            </SearchButton>
          </div>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border border-separate">
            <thead className="bg-blue-100 border-b-2 border-gray-200 ">
              <tr>
                <td className="p-3 text-sm font-semibold tracking-wide text-left">
                  Username
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
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  <div className="flex justify-center items-center">
                    <div className="custom-loader"></div>
                  </div>
                </td>
              </tr>
            ) : (
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-2 bg-red-500 text-white"
                    >
                      <strong>Data tidak ditemukan.</strong>
                    </td>
                  </tr>
                ) : (
                  currentItems?.map((order) => (
                    <tr key={order.id}>
                      <td className="p-3 text-sm text-gray-700 ">
                        {order.User?.name}
                      </td>
                      <td className="p-3 text-sm text-gray-700 ">
                        {order.Course.Category.name}
                      </td>
                      <td className="p-3 text-sm text-gray-700 ">
                        {order.Course.title}
                      </td>
                      <td
                        className={`p-3 text-md font-bold text-gray-700 ${
                          order.status === "pending"
                            ? "text-yellow-800"
                            : order.status === "settlement" ||
                              order.status === "capture"
                            ? "text-green-600"
                            : order.status === "failed" ||
                              order.status === "expire"
                            ? "text-red-600"
                            : "text-black"
                        }`}
                      >
                        {order.status}
                      </td>
                      <td className="p-3 text-sm text-gray-700 ">
                        {order.payment_type}
                      </td>
                      <td className="p-3 text-sm text-gray-700 ">
                        {formatDate(order.updatedAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>

        <div className="flex justify-center mt-4">
          {search.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={search.length}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Table;
