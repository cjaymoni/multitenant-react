import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SidebarItems from "./SidebarItems";
import { Link, useLocation } from "react-router-dom";
import Can from "../casl/can";
// import Can from '../../casl/can';
// import { Desktop } from '../../utils/mediaQueries';

function Sidebar(props, { defaultActive }) {
  const location = useLocation();
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
    const activeItem = SidebarItems.findIndex(
      (item) => getPath(item.route) === getPath(location.pathname)
    );
    changeActiveIndex(activeItem);
  }, [location]);

  return (
    <>
      <SidebarParent>
        <div className="fixed">
          {/* <Desktop> */}
          <div className="flex justify-content-between">
            <div className="flex">
              <img
                src={process.env.PUBLIC_URL + "aiti-logo.png"}
                alt="logo"
                className="w-full h-4rem p-2"
              />
            </div>
            <div className="align-self-center flex align-items-center justify-content-center text-xl p-3">
              Company Name
            </div>
          </div>
          {/* </Desktop> */}
          {SidebarItems.map((item, index) => {
            return (
              <Link to={item.route}>
                <Can do="view" on={item.name}>
                  <SidebarItem key={item.name} active={index === activeIndex}>
                    <p>
                      {item.icon}
                      &nbsp;&nbsp;
                      {/* <Desktop> */}
                      {item.name}
                      {/* </Desktop> */}
                    </p>
                  </SidebarItem>
                </Can>
              </Link>
            );
          })}
          {/* <div className="fixed bottom-0 mx-5 w-15rem">
            <img
              src={process.env.PUBLIC_URL + 'powered-by.jpg'}
              alt="powered-by"
              className="w-full h-4rem p-1"
            />
          </div> */}
        </div>

        <div className="behind-the-scenes" />
      </SidebarParent>
    </>
  );
}

export default Sidebar;

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

  a {
    text-decoration: none;
  }

  & > div {
    width: 16vw;
    height: 100vh;
  }
  .behind-the-scenes {
    width: 16vw;
    height: 100vh;
    overflow-y: auto;
  }
`;

const SidebarItem = styled.div`
  padding: 6px 24px;
  transition: all 0.25s ease-in-out;
  background: ${(props) => (props.active ? "#ADD8E6" : "")};
  margin: 4px 12px;
  border-radius: 4px;
  p {
    color: white;
    font-weight: bold;
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
  }

  &:hover:not(:first-child) {
    background: #c34a36;
  }
`;
