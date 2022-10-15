import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="bg-black flex text-white justify-between items-center px-6 py-4 mx-auto">
      <h1 className="cursor-pointer">Crypto Collection</h1>
      <div className="flex gap-3">
        <h4 className="cursor-pointer">Watchlist</h4>
        <h4 className="cursor-pointer">Notification</h4>
      </div>
    </nav>
  );
};

export default Navbar;
