import logo from "./logo.svg";
import "./App.scss";
import RouterFunction from "./routes";
import { Router, useRoutes } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import About from "./pages/about";
import MarketPlace from "./pages/marketplace";
// import AppWrapper from "./routes";

function App() {
  return (
    <div className="App">
      <RouterFunction />

      {/* <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header> */}
    </div>
  );
}

export default App;
