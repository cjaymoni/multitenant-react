import React, { Component } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

export class SidebarDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleLeft: false,
      visibleRight: false,
      visibleTop: false,
      visibleBottom: false,
      visibleFullScreen: false,
      visibleCustomToolbar: false,
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
        <div className="card">
          <Sidebar
            visible={this.state.visibleLeft}
            onHide={() => this.setState({ visibleLeft: false })}
          >
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
          <Button
            icon="pi pi-arrow-left"
            onClick={() => this.setState({ visibleRight: true })}
            className="mr-2"
          />
          <Button
            icon="pi pi-arrow-down"
            onClick={() => this.setState({ visibleTop: true })}
            className="mr-2"
          />
          <Button
            icon="pi pi-arrow-up"
            onClick={() => this.setState({ visibleBottom: true })}
            className="mr-2"
          />
          <Button
            icon="pi pi-th-large"
            onClick={() => this.setState({ visibleFullScreen: true })}
            className="mr-2"
          />
          <Button
            icon="pi pi-plus"
            onClick={() => this.setState({ visibleCustomToolbar: true })}
          />
        </div>
      </div>
    );
  }
}
