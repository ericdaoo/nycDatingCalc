import './App.css';
import React, { useState } from "react"
import Calculator from './components/Calculator';


function App() {

  return (
    <div className="container">
        {/* <DataPull /> */}
        {/* <RangeSlider /> */}
        <Calculator />
    </div>
  );
}

export default App;