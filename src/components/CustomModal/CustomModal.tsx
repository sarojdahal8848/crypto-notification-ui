import { Dialog, Transition } from "@headlessui/react";

import { Fragment, useEffect, useState } from "react";
import { useMutation } from "react-query";

interface IModalProps {
  handleCloseModal: () => void;
  isOpen: boolean;
  cryptoCode: string;
  handleFormSubmit: (watchlistData: IWatchListData) => void;
}

export interface IWatchListData {
  code: string;
  max_price: string;
  min_price: string;
}

export const CustomModal = ({
  handleCloseModal,
  isOpen,
  cryptoCode,
  handleFormSubmit,
}: IModalProps) => {
  const [watchListData, setWatchListData] = useState<IWatchListData>({
    code: "",
    min_price: "",
    max_price: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    handleFormSubmit(watchListData);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setWatchListData((prev) => ({ ...prev, [name]: value, code: cryptoCode }));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add to Watchlist
                  <span>({cryptoCode})</span>
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="number"
                      placeholder="Minimum Price"
                      className="input-field"
                      name="min_price"
                      value={watchListData.min_price}
                      onChange={handleChange}
                      required={true}
                    />
                    <input
                      type="number"
                      placeholder="Maximum Price"
                      className="input-field"
                      name="max_price"
                      value={watchListData.max_price}
                      onChange={handleChange}
                      required={true}
                    />
                    <button
                      type="submit"
                      className="w-full py-2 px-4 border-[1px] rounded-lg bg-slate-400 hover:bg-slate-300"
                    >
                      Add
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
