import React from "react";
import NavItem from "./navItem/NavItem.jsx";
import { adminMenu } from "./menu.config";

const AdminSidebar = (props) => {
  return (
    <>
      <div className="admin-sidebar">
        <div className="flex justify-content-center mt-2 mb-3">
          <div className="flex align-items-center">
            <img
              src={process.env.PUBLIC_URL + "aiti-logo.png"}
              alt="logo"
              className="w-full h-4rem p-2"
            />
          </div>
        </div>
        {adminMenu.map((item, index) => {
          return <NavItem key={`${item.label}-${index}`} item={item} />;
        })}
      </div>
    </>
  );
};

export default AdminSidebar;
