/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { IDataProps } from "../../pages";
import qs from "qs";
import { debounce } from "../../utils";
import { CustomModal } from "../CustomModal/CustomModal";

interface IColumns {
  access_name: string;
  label: string;
}

interface ITableRows {
  id: string;
  image: string;
  name: string;
  code: string;
  price: string;
  market_cap: string;
  _24h: string;
}

interface ITableProps {
  columns: IColumns[];
  data: IDataProps;
}

interface IFilter {
  page?: number;
  limit?: number;
}

const CustomTable = ({ columns, data }: ITableProps) => {
  const { items: rows, meta, links } = data;
  const [searchValue, setSetSearchValue] = useState("");
  const [filter, setFilter] = useState<IFilter>({ page: 1, limit: 10 });
  const router = useRouter();

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSearchDebounce = (query: string) => {
    router.push(`/?search=heelo`);
  };
  const handleSearch = (event: any) => {
    const { value } = event.target;
    setSetSearchValue(value);
    debounce(handleSearchDebounce, 500);
  };

  const handlePaginationChange = (pageNumber: number) => {
    const queryString = qs.stringify({ ...filter, page: pageNumber });
    router.push(`/?${queryString}`);
  };

  const handlefilterChange = (event: any) => {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
    const queryString = qs.stringify({ ...filter, [name]: value });
    router.push(`/?${queryString}`);
  };

  const isNextDisabled = (): boolean => {
    return meta.currentPage >= meta.totalPages;
  };
  const isPrevDisabled = (): boolean => {
    return meta.currentPage <= 1;
  };

  return (
    <div className="overflow-x-auto relative">
      <div className="flex justify-between items-center py-4 bg-white px-2">
        <select
          name="limit"
          onChange={handlefilterChange}
          value={filter?.limit}
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 "
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
        </select>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for users"
            onChange={handleSearch}
            value={searchValue}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th></th>
            {columns.map((column) => {
              return (
                <th scope="col" className="py-3 px-6" key={column.access_name}>
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <tr key={row.id} className="bg-white border-b  hover:bg-gray-50 ">
                <td className="py-4 px-6">
                  <HeartIcon
                    onClick={openModal}
                    className="w-5 h-5 text-gray-500 dark:text-gray-400 cursor-pointer"
                  />
                </td>
                {columns.map((column) => {
                  if (column.access_name === "image") {
                    return (
                      <td key={column.access_name} className="py-4 px-6">
                        <img
                          src={row[column.access_name as keyof ITableRows]}
                          alt="crypto-image"
                          height={30}
                          width={30}
                        />
                      </td>
                    );
                  }
                  return (
                    <td key={column.access_name} className="py-4 px-6">
                      {row[column.access_name as keyof ITableRows]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav
        className="flex justify-between items-center pt-4"
        aria-label="Table navigation"
      >
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <a
              onClick={() => handlePaginationChange(meta.currentPage - 1)}
              className={`block pagination-button cursor-pointer ${
                isPrevDisabled() ? "disabled" : ""
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="w-5 h-5" />
            </a>
          </li>
          <li>
            <a className="pagination-button">{meta.currentPage}</a>
          </li>
          <li>
            <a
              onClick={() => handlePaginationChange(meta.currentPage + 1)}
              className={`block pagination-button cursor-pointer ${
                isNextDisabled() ? "disabled" : ""
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="w-5 h-5" />
            </a>
          </li>
        </ul>
      </nav>
      <CustomModal isOpen={isOpen} handleCloseModal={closeModal} />
    </div>
  );
};

export default CustomTable;
