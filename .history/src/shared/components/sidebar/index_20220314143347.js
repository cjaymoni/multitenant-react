import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SidebarData from "./SidebarItems";
import SubMenu from "./SubMenu";
import Can from "../../casl/can";
import history from "../../services/history";

const SidebarParent = styled.div`
  background-image: linear-gradient(
    to right top,
    #2d6678,
    #2e6a7d,
    #2e6d81,
    #2f7186,
    #2f758b,
    #2a768f,
    #247694,
    #1f7798,
    #12759c,
    #0473a0,
    #0070a4,
    #026da7
  );
  overflow-wrap: break-word;
  width: 100%;
  height: 100vh;
  // overflow-y: auto;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background-image: linear-gradient(
    to right top,
    #2d6678,
    #2e6a7d,
    #2e6d81,
    #2f7186,
    #2f758b,
    #2a768f,
    #247694,
    #1f7798,
    #12759c,
    #0473a0,
    #0070a4,
    #026da7
  );
  width: 18vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: fixed;
  // overflow-y: auto;
  overflow-wrap: break-word;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;
const SidebarWrap = styled.div`
  width: 100%;
`;

function Sidebar(props, { defaultActive }) {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);
  const location = history.location;
  const lastActiveIndexString = localStorage.getItem("lastActiveIndex");
  const lastActiveIndex = Number(lastActiveIndexString);
  const [activeIndex, setActiveIndex] = useState(
    lastActiveIndex || defaultActive
  );

  function changeActiveIndex(newIndex) {
    localStorage.setItem("lastActiveIndex", newIndex);
    setActiveIndex(newIndex);
  }

  function getPath(path) {
    if (path.charAt(0) !== "/") {
      return "/" + path;
    }
    return path;
  }

  useEffect(() => {
    const activeItem = SidebarData.findIndex(
      (item) => getPath(item.path) === getPath(location.pathname)
    );
    changeActiveIndex(activeItem);
    setActiveIndex(activeItem);
    // console.log(activeIndex);
  }, [location, activeIndex]);

  return (
    <>
      <SidebarParent>
        {/* <NavIcon to="#">
          <i className="pi pi-bars" onClick={showSidebar}></i>
        </NavIcon> */}

        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            {/* <NavIcon to="#">
              <i className="pi pi-times" onClick={showSidebar}></i>
            </NavIcon> */}
            <div className="flex justify-content-center mt-2 mb-3">
              <div className="flex align-items-center">
                <img
                  src={process.env.PUBLIC_URL + "aiti-logo.png"}
                  alt="logo"
                  className="w-full h-4rem p-2"
                />
              </div>
            </div>
            {SidebarData.map((item, index) => {
              return (
                <Can do="view" on={item.title}>
                  <SubMenu item={item} key={index} active={activeIndex} />
                </Can>
              );
            })}
          </SidebarWrap>
        </SidebarNav>
      </SidebarParent>
    </>
  );
}

export default Sidebar;
