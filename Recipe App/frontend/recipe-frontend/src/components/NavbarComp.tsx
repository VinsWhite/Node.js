import { FaRegBell } from "react-icons/fa";
import { BsFilterLeft } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

export default function NavbarComp() {

    const [searchState, setSearchState] = useState<boolean>(false);

  return (
    <>
        <div className="navbar bg-[#fbe57f]">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                    <BsFilterLeft className="text-xl" />
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Homepage</a></li>
                    <li><a>Portfolio</a></li>
                    <li><a>About</a></li>
                </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="text-xl font-semibold">SO YUMMY</a>
            </div>
            <div className="navbar-end">
                <button onClick={() => setSearchState(!searchState)} className="btn btn-ghost btn-circle">
                    <IoSearch className="text-xl" />
                </button>
                {searchState && (
                    <input type="search" placeholder="ciao..." name="search" />
                )}
                <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <FaRegBell className="text-xl" />
                    {/* <span className="badge badge-xs badge-primary indicator-item"></span> */}
                </div>
                </button>
            </div>
        </div>
    </>
  )
}
