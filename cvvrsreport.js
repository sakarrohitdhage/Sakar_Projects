import React from 'react';
import './cvvrsreport.css';

const CvvrsReport = () => {
  return (
    <div className="cvvrs-report-container">
      <h2>CVVRS Analysis Report</h2>

      {/* Main Data Entry Table */}
      <table className="cvvrs-table">
        <tbody>
          {/* Row 1 */}
          <tr>
            <td className="key-column">Train Number:</td>
            <td><textarea className="text-block"></textarea></td>
            <td className="key-column">Loco Number:</td>
            <td><textarea className="text-block"></textarea></td>
          </tr>

          {/* Row 2 */}
          <tr>
            <td className="key-column">Journey Date:</td>
            <td><textarea className="text-block"></textarea></td>
            <td className="key-column">Inspector Name:</td>
            <td><textarea className="text-block"></textarea></td>
          </tr>

          {/* Row 3 */}
          <tr>
            <td className="key-column">Report ID:</td>
            <td><textarea className="text-block"></textarea></td>
            <td className="key-column">Report Date:</td>
            <td><textarea className="text-block"></textarea></td>
          </tr>

          {/* Row 4 */}
          <tr>
            <td className="key-column">MPS:</td>
            <td><textarea className="text-block" ></textarea></td>
            <td className="key-column">No. of Stops:</td>
            <td><textarea className="text-block"></textarea></td>
          </tr>

          {/* Row 5 */}
          <tr>
            <td className="key-column">LP Name:</td>
            <td><textarea className="text-block"></textarea></td>
            <td className="key-column">ALP Name:</td>
            <td><textarea className="text-block"></textarea></td>
          </tr>

          {/* Row 6 */}
          <tr>
            <td className="key-column">Start Time of Analysis:</td>
            <td><textarea className="text-block"></textarea></td>
            <td className="key-column">End Time of Analysis:</td>
            <td><textarea className="text-block"></textarea></td>
          </tr>
        </tbody>
      </table>

      {/* Secondary Table (if needed) */}
      <table className="cvvrs-table">
  <thead>
    <tr>
      <th>Activity</th>
      <th>LP</th>
      <th>ALP</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><textarea className="text-block" placeholder="Enter Activity"></textarea></td>
      <td><textarea className="text-block" placeholder="Enter LP"></textarea></td>
      <td><textarea className="text-block" placeholder="Enter ALP"></textarea></td>
    </tr>
    <tr>
      <td><textarea className="text-block" placeholder="Enter Activity"></textarea></td>
      <td><textarea className="text-block" placeholder="Enter LP"></textarea></td>
      <td><textarea className="text-block" placeholder="Enter ALP"></textarea></td>
    </tr>
    <tr>
      <td><textarea className="text-block" placeholder="Enter Activity"></textarea></td>
      <td><textarea className="text-block" placeholder="Enter LP"></textarea></td>
      <td><textarea className="text-block" placeholder="Enter ALP"></textarea></td>
    </tr>
    <tr>
      <td><textarea className="text-block" placeholder="Enter Activity"></textarea></td>
      <td><textarea className="text-block" placeholder="Enter LP"></textarea></td>
      <td><textarea className="text-block" placeholder="Enter ALP"></textarea></td>
    </tr>
    <tr>
      <td><textarea className="text-block" placeholder="Enter Activity"></textarea></td>
      <td><textarea className="text-block" placeholder="Enter LP"></textarea></td>
      <td><textarea className="text-block" placeholder="Enter ALP"></textarea></td>
    </tr>
  </tbody>
</table>
    </div>
  );
};

export default CvvrsReport;
