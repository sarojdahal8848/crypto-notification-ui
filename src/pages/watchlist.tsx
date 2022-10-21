import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import CustomTable from "../components/CustomTable/CustomTable";
import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import qs from "qs";
import { useEffect, useState } from "react";
import { IWatchListData } from "../components/CustomModal/CustomModal";

const columns = [
  { access_name: "code", label: "Code" },
  { access_name: "min_price", label: "Min Price($)" },
  { access_name: "max_price", label: "Max Price($)" },
];

interface ICryptoData {
  id: string;
  image: string;
  name: string;
  code: string;
  price: string;
  market_cap: string;
  _24h: string;
}

export interface IMetaData {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IDataLinks {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface IDataProps {
  items: ICryptoData[];
  meta: IMetaData;
  links: IDataLinks;
}

interface IWatchListProps {
  data: IDataProps;
}

interface IQueryOptions {
  search?: string;
  page?: number;
  limit?: number;
}

const WatchList: NextPage<IWatchListProps> = ({ data }) => {
  return (
    <Layout>
      <main className="flex justify-between items-center flex-col my-[100px] mx-6">
        <CustomTable columns={columns} data={data} searchPath="watchlist/" />
      </main>
    </Layout>
  );
};

export default WatchList;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const options: Partial<IQueryOptions> = {
    page: query.page ? +query.page : 1,
    limit: query.limit ? +query.limit : 10,
  };
  if (query.search) {
    options.search = query.search as string;
  }
  const queryString = qs.stringify(options);
  const res = await fetch(`http://localhost:5000/watchlist?${queryString}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
