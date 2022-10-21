import { Popover, Transition } from "@headlessui/react";
import { BellIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const Navbar = (props: Props) => {
  const [notification, setNotification] = useState<string[]>([]);
  useEffect(() => {
    const source = new EventSource(`http://localhost:5000/notification/sse`);

    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });

    source.addEventListener("message", (e) => {
      console.log(e);
      const notificationMsg = JSON.parse(e.data);
      setNotification(notificationMsg);
    });

    source.addEventListener("error", (e) => {
      console.error("Error: ", e);
    });

    return () => {
      source.close();
    };
  }, [notification]);

  return (
    <div>
      <nav className="bg-black flex text-white justify-between items-center px-6 py-4 mx-auto fixed w-full top-0 z-50">
        <Link href="/">
          <h1 className="cursor-pointer">Crypto Collection</h1>
        </Link>
        <div className="flex gap-3">
          <h4 className="cursor-pointer">
            <Link href="/watchlist">
              <BookmarkIcon className="w-5 h-5 text-white  cursor-pointer" />
            </Link>
          </h4>

          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button>
                  <BellIcon className="w-5 h-5 text-white  cursor-pointer" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -right-[200px] w-[400px] z-10 mt-3 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      {notification?.map((val, index) => {
                        return (
                          <div className="bg-gray-50 p-4" key={index}>
                            <a
                              href="##"
                              className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <span className="flex items-center">
                                <span className="text-sm font-medium text-gray-900">
                                  {val}
                                </span>
                              </span>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          <div className="fixed top-16 w-full max-w-sm px-4"></div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
