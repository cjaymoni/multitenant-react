import React from "react";
import NavItem from "./navItem/NavItem.jsx";
import { sideMenu } from "./menu.config.js";
import Can from "../../casl/can";

const Sidebar = (props) => {
  return (
    <>
      <div className="sidebar">
        <div className="flex justify-content-center mt-2 mb-3">
          <div className="flex align-items-center">
            <img
              src={process.env.PUBLIC_URL + "aiti-logo.png"}
              alt="logo"
              className="w-full h-4rem p-2"
            />
          </div>
        </div>
        {sideMenu.map((item, index) => {
          return (
            <Can do="view" on={item.label}>
              <NavItem key={`${item.label}-${index}`} item={item} />
            </Can>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
