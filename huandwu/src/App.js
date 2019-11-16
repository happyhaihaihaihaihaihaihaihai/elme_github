import React from 'react';
import 'element-theme-default';
import {BrowserRouter} from "react-router-dom"
import Router from "./router"

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Router></Router>
     </BrowserRouter>
    </div>
  );
}

export default App;
