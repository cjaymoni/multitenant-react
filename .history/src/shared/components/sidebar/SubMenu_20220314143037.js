import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: #f4f7ff;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  font-weight: bolder;
  flex-wrap: wrap;
  text-overflow: ellipsis;

  &:hover {
    background: #aeb6d0;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
  text-overflow: ellipsis;
`;

const DropdownLink = styled(Link)`
  background: #4b5f9570;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 16px;
  font-weight: bolder;

  &:hover {
    background: #2c9ee4;
    cursor: pointer;
    border-left: 4px solid #632ce4;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
        onClick={item.subNav && showSubnav}
        to={item.path}
        active={false}
      >
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav ? (
            <i className="pi pi-chevron-circle-up text-xl" />
          ) : // ? item.iconOpened
          item.subNav ? (
            <i className="pi pi-chevron-circle-down text-xl" />
          ) : // ? item.iconClosed
          null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
