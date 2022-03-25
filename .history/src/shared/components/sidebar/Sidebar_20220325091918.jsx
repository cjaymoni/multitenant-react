import React from "react";
import style from "./sidebar.module.css";
import NavItem from "./navItem/NavItem.jsx";
import { sideMenu } from "./menu.config.js";

const Sidebar = (props) => {
  return (
    <>
      <div className="flex justify-content-center mt-2 mb-3">
        <div className="flex align-items-center">
          <img
            src={process.env.PUBLIC_URL + "aiti-logo.png"}
            alt="logo"
            className="w-full h-4rem p-2"
          />
        </div>
      </div>
      <nav className={style.sidebar}>
        {sideMenu.map((item, index) => {
          return <NavItem key={`${item.label}-${index}`} item={item} />;
        })}
      </nav>
    </>
  );
};

export default Sidebar;
