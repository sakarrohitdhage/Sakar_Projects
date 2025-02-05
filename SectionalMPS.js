// src/SectionalMPS.js
import React, { useState } from 'react';
import "./SectionalMPS.css";

// Sectional MPS Page component
const SectionalMPS = () => {
  // State to manage table rows
  const [data, setData] = useState([]);

  // Add a new row to the table
  const addRow = () => {
    setData([...data, { station: "", kmStart: "", kmEnd: "", mps: "" }]);
  };

  // Handle input change
  const handleInputChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  return (
    <div className="App">
      <h1>Sectional MPS</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Station</th>
            <th>Km Start</th>
            <th>Km End</th>
            <th>MPS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.station}
                  onChange={(e) => handleInputChange(index, "station", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.kmStart}
                  onChange={(e) => handleInputChange(index, "kmStart", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.kmEnd}
                  onChange={(e) => handleInputChange(index, "kmEnd", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.mps}
                  onChange={(e) => handleInputChange(index, "mps", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Row Button Container */}
      <div className="add-row-container">
        <button onClick={addRow} className="sectional-mps-button">
          Add Row
        </button>
      </div>
    </div>
  );
};

export default SectionalMPS;

