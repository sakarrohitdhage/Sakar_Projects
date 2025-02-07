import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SectionalMPS from './SectionalMPS'; // Import the SectionalMPS component
import SpmReport from "./SPMReport";
import CvvrsReport from "./cvvrsreport";
import SpmGraph from "./spmgraph";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sectionalmps" element={<SectionalMPS />} />
      <Route path="/spm-report" element={<SpmReport />} />
      <Route path="/cvvrs-report" element={<CvvrsReport />} />
      <Route path="/spm-graph" element={<SpmGraph />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();

