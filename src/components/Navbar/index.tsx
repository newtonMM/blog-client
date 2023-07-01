import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 flex items-center justify-center">
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">
          Its really not that interesting
        </a>
        <a className="btn btn-ghost normal-case text-xl">Series</a>
        <a className="btn btn-ghost normal-case text-xl">Stories</a>
      </div>
    </div>
  );
};

export default Navbar;
