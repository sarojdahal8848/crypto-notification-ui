import type { GetServerSideProps, NextPage } from "next";
import qs from "qs";
import { IWatchListData } from "../components/CustomModal/CustomModal";
import CustomTable from "../components/CustomTable/CustomTable";
import Layout from "../components/Layout/Layout";
import { BASE_URL } from "../utils";

const columns = [
  { access_name: "image", label: "Image" },
  { access_name: "name", label: "Name" },
  { access_name: "code", label: "Code" },
  { access_name: "price", label: "Price ($)" },
  { access_name: "market_cap", label: "Market Cap (Billion)" },
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
  watchlistData: IWatchListData[];
}

interface IQueryOptions {
  search?: string;
  page?: number;
  limit?: number;
}

const Home: NextPage<IHomeProps> = ({ data, watchlistData }) => {
  return (
    <Layout>
      <main className="flex justify-between items-center flex-col my-[100px] mx-6">
        <CustomTable
          columns={columns}
          data={data}
          watchListData={watchlistData}
          favIcon={true}
          searchPath="/"
        />
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
  const res = await fetch(`${BASE_URL}/crypto?${queryString}`);
  const data = await res.json();

  const resWatchlist = await fetch(`${BASE_URL}/watchlist/getAll`);
  const watchlistData = await resWatchlist.json();
  console.log(resWatchlist);

  return {
    props: {
      data,
      watchlistData,
    },
  };
};
