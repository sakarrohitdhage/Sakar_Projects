import React from "react";
import "./SPMReport.css"; // Import CSS file for styling

const SPMReport = () => {
  // Custom names for the first 10 rows of the second table
  const rowNames = [
    "MPS Achieved:", "Total Distance at Achieved MPS:", "Distance at near Achieved MPS(95%)", "Distance at near Overall MPS(95%)", "Total Journey Distance:", "Total Journey Time:", "Average Speed: (Distance/time)", "Average Running Speed:", "Number of stops taken:", "Unscheduled Stops:"
  ];

  return (
    <div className="spm-report-container">
      <h2>Speedometer Data Abnalysis</h2>

      {/* First Table (4 Columns, 6 Rows) */}
      <table className="spm-table">
        <tbody>
          <tr>
            <td>Train Number:</td>
            <td><input type="text" className="spm-input" /></td>
            <td>Loco Number:</td>
            <td><input type="text" className="spm-input" /></td>
          </tr>
          <tr>
            <td>Journey Date:</td>
            <td><input type="text" className="spm-input" /></td>
            <td>Inspector Name:</td>
            <td><input type="text" className="spm-input" /></td>
          </tr>
          <tr>
            <td>Report ID:</td>
            <td><input type="text" className="spm-input" /></td>
            <td>Report Date:</td>
            <td><input type="text" className="spm-input" /></td>
          </tr>
          <tr>
            <td>MPS:</td>
            <td><input type="text" className="spm-input" /></td>
            <td>No. of Stops:</td>
            <td><input type="text" className="spm-input" /></td>
          </tr>
          <tr>
            <td>LP Name:</td>
            <td><input type="text" className="spm-input" /></td>
            <td>ALP Name:</td>
            <td><input type="text" className="spm-input" /></td>
          </tr>
          <tr>
            <td>Start Time of Analysis:</td>
            <td><input type="text" className="spm-input" /></td>
            <td>End Time of Analysis:</td>
            <td><input type="text" className="spm-input" /></td>
          </tr>
        </tbody>
      </table>

       {/* Second Table */}
      <table className="spm-table">
        
        <tbody>
          {/* First 10 rows with custom names */}
          {rowNames.map((rowName, index) => (
            <tr key={index}>
              <td>{rowName}</td> {/* Display custom row name */}
              <td colSpan="3">
                <input type="text" className="spm-input" />
              </td>
            </tr>
          ))}

          {/* Last 2 rows with meaningful names */}
          <tr>
            <td>BFT Time:</td>
            <td>
              <input type="text" className="spm-input" />
            </td>
            <td>Speed Drop:</td>
            <td>
              <input type="text" className="spm-input" />
            </td>
          </tr>
          <tr>
            <td>BPT Time:</td>
            <td>
              <input type="text" className="spm-input" />
            </td>
            <td>Speed Drop:</td>
            <td>
              <input type="text" className="spm-input" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SPMReport;

