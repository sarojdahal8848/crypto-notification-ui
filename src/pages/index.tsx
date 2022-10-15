import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import CustomTable from "../components/CustomTable/CustomTable";
import Layout from "../components/Layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import qs from "qs";

const columns = [
  { access_name: "image", label: "Image" },
  { access_name: "name", label: "Name" },
  { access_name: "code", label: "Code" },
  { access_name: "price", label: "Price" },
  { access_name: "market_cap", label: "Market Cap" },
  { access_name: "_24h", label: "Change" },
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

interface IHomeProps {
  data: IDataProps;
}

interface IQueryOptions {
  search?: string;
  page?: number;
  limit?: number;
}

const Home: NextPage<IHomeProps> = ({ data }) => {
  return (
    <Layout>
      <main className="flex justify-between items-center flex-col my-4 mx-6">
        <CustomTable columns={columns} data={data} />
      </main>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const options: Partial<IQueryOptions> = {
    page: query.page ? +query.page : 1,
    limit: query.limit ? +query.limit : 10,
  };
  if (query.search) {
    options.search = query.search as string;
  }
  const queryString = qs.stringify(options);
  const res = await fetch(`http://localhost:5000/crypto?${queryString}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
