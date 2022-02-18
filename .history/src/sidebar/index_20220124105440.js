import React, { Component } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

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
            <h3>Left Sidebar</h3>
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
