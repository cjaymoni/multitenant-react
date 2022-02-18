import React, { Component } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import SidebarItems from "./SidebarItems";
import { Link } from "react-router-dom";
import styled from "styled-components";

export class SidebarDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleLeft: true,
    };
  }

  render() {
    const customIcons = (
      <React.Fragment>
        <button className="p-sidebar-icon p-link mr-1">
          <span className="pi pi-print" />
        </button>
        <button className="p-sidebar-icon p-link mr-1">
          <span className="pi pi-arrow-right" />
        </button>
      </React.Fragment>
    );

    return (
      <div>
        <div className="w-2">
          <Sidebar
            visible={this.state.visibleLeft}
            onHide={() => this.setState({ visibleLeft: false })}
            modal={false}
            // icons={customIcons}
            showCloseIcon={false}
            className="w-2 shadow-0"
            style={{
              backgroundImage:
                "linear-gradient(to right top,#2d6678,#2e6a7d,#2e6d81,#2f7186,#2f758b,#2a768f,#247694,#1f7798,#12759c,#0473a0,#0070a4,#026da7)",
            }}
          >
            <div className="p-sidebar-header flex justify-content-between -mt-3">
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
            {SidebarItems.map((item, index) => {
              return (
                <Link to={item.route} className="no-underline p-2 ml-6">
                  <div className="flex w-full  align-items-center justify-content-start text-white font-bold text-l h-3rem ">
                    <div className="flex mr-2">{item.icon}</div>
                    <div className="flex">{item.name}</div>
                  </div>
                  {/* <Can do="view" on={item.name}> */}
                  {/* <SidebarItem key={item.name}>
                    <p>
                      {item.icon} */}
                  {/* &nbsp; */}
                  {/* <Desktop> */}
                  {/* {item.name} */}
                  {/* </Desktop> */}
                  {/* </p>
                  </SidebarItem> */}
                  {/* </Can> */}
                </Link>
              );
            })}
          </Sidebar>

          <Sidebar
            visible={this.state.visibleCustomToolbar}
            onHide={() => this.setState({ visibleCustomToolbar: false })}
            icons={customIcons}
          >
            <h3>Sidebar with custom icons</h3>
          </Sidebar>

          <Button
            icon="pi pi-arrow-right"
            onClick={() => this.setState({ visibleLeft: true })}
            className="mr-2"
          />
        </div>
      </div>
    );
  }
}
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
