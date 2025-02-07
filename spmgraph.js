// SpmGraphPage.js
import React, { useState, useEffect } from "react";
import './spmgraph.css'; // Import the CSS file to style the page
import sakarLogo from './sakar.png';
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea
} from "recharts";

const SpmGraphPage = () => {
  // State to track visibility of each analysis
  const [isSpeedAnalysisVisible, setIsSpeedAnalysisVisible] = useState(true);
  const [isOverallAnalysisVisible, setIsOverallAnalysisVisible] = useState(true);

  // State to track visibility of individual Speed Analysis options
  const [showMPS, setShowMPS] = useState(false);
  const [showAverageSpeed, setShowAverageSpeed] = useState(false);
  const [showMinimumSpeed, setShowMinimumSpeed] = useState(false);

  // State to track visibility of individual Overall Analysis options
  const [showTimeAtHalt, setShowTimeAtHalt] = useState(false);
  // We'll use "usr" to control the display of Unnecessary Speed Reduction markers.
  const [showBPT, setShowBPT] = useState(false); // You can use this for additional BPT content if needed.
  const [showBFT, setShowBFT] = useState(false);
  const [showRunAt, setShowRunAt] = useState(false);
  const [showUnscheduleHalts, setShowUnscheduleHalts] = useState(false);
  const [showRunAtMax, setShowRunAtMax] = useState(false);
  const [showOverspeed, setShowOverspeed] = useState(false);
  const [showOverspeedInSR, setShowOverspeedInSR] = useState(false);
  const [showSuddenSpeedIncrease, setShowSuddenSpeedIncrease] = useState(false);
  const [showSuddenSpeedDecrease, setShowSuddenSpeedDecrease] = useState(false);

  // We'll use "usr" to toggle the fetching and display of markers for unnecessary speed reductions.
  const [usr, setUsr] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file; // Excel file passed from the main page

  const [data, setData] = useState([]);
  const [sectionMarkers, setSectionMarkers] = useState([]);
  const [halts, setHalts] = useState(false);

  // Fixed x-axis domain based on your provided sections.
  const xDomain = [130189.01, 130496.86];

  // --- Handlers for Analysis Visibility ---
  const handleSpeedAnalysisChange = (e) => {
    setIsSpeedAnalysisVisible(e.target.checked);
  };

  const handleOverallAnalysisChange = (e) => {
    setIsOverallAnalysisVisible(e.target.checked);
  };

  // Handlers for individual Speed Analysis options
  const handleMPSChange = (e) => { setShowMPS(e.target.checked); };
  const handleAverageSpeedChange = (e) => { setShowAverageSpeed(e.target.checked); };
  const handleMinimumSpeedChange = (e) => { setShowMinimumSpeed(e.target.checked); };

  // Handlers for individual Overall Analysis options
  const handleTimeAtHaltChange = (e) => { setShowTimeAtHalt(e.target.checked); };
  const handleBPTChange = (e) => { setShowBPT(e.target.checked); };
  const handleBFTChange = (e) => { setShowBFT(e.target.checked); };
  const handleRunAtChange = (e) => { setShowRunAt(e.target.checked); };
  const handleUnscheduleHaltsChange = (e) => { setShowUnscheduleHalts(e.target.checked); };
  const handleRunAtMaxChange = (e) => { setShowRunAtMax(e.target.checked); };
  const handleOverspeedChange = (e) => { setShowOverspeed(e.target.checked); };
  const handleOverspeedInSRChange = (e) => { setShowOverspeedInSR(e.target.checked); };
  const handleSuddenSpeedIncreaseChange = (e) => { setShowSuddenSpeedIncrease(e.target.checked); };
  const handleSuddenSpeedDecreaseChange = (e) => { setShowSuddenSpeedDecrease(e.target.checked); };

  // --- Load Excel File Data ---
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const formattedData = jsonData.map((row) => ({
          distance: parseFloat(row["Distance"]),
          speed: parseFloat(row["Speed"])
        }));
        setData(formattedData);
        console.log("Loaded Excel Data:", formattedData);
      };
      reader.readAsBinaryString(file);
    }
  }, [file]);

  // --- Fetch Section Markers for Unnecessary Speed Reductions ---
  // Now using the "usr" state.
  useEffect(() => {
    console.log("Unnecessary Speed Reductions toggled to:", usr);
    if (usr) {
      fetch("http://localhost:8000/api/sectionResults")
        .then((res) => {
          console.log("Response from backend:", res);
          return res.json();
        })
        .then((markers) => {
          console.log("Fetched section markers:", markers);
          setSectionMarkers(markers);
        })
        .catch((err) => console.error("Error fetching section markers:", err));
    } else {
      setSectionMarkers([]);
    }
  }, [usr]);

  // --- Compute Halt Points (where speed equals 0) ---
  const haltPoints = data.filter((point) => point.speed === 0);

  return (
    <div className="spm-graph-page">
      {/* Header Bar */}
      <div className="header-bar">
        <div className="logo-container">
          <img src={sakarLogo} alt="Sakar Logo" className="sakar-logo" />
        </div>
        <div className="cvvrs-text">CVVRS and SPM Analysis</div>
      </div>
      <h1>SPM Graph Analysis</h1>

      {/* Checkboxes for toggling Speed and Overall Analysis */}
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={isSpeedAnalysisVisible}
            onChange={handleSpeedAnalysisChange}
          />
          Show Speed Analysis
        </label>
        <label>
          <input
            type="checkbox"
            checked={isOverallAnalysisVisible}
            onChange={handleOverallAnalysisChange}
          />
          Show Overall Analysis
        </label>
      </div>

      <div className="analysis-container">
        {isSpeedAnalysisVisible && (
          <div className="analysis-content speed-analysis">
            <h2>Speed Analysis</h2>
            <div className="speed-analysis-options">
              <label>
                <input
                  type="checkbox"
                  checked={showMPS}
                  onChange={handleMPSChange}
                />
                MPS
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={showAverageSpeed}
                  onChange={handleAverageSpeedChange}
                />
                Average Speed
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={showMinimumSpeed}
                  onChange={handleMinimumSpeedChange}
                />
                Minimum Speed
              </label>
            </div>
            {showMPS && <div className="analysis-result">MPS Content</div>}
            {showAverageSpeed && <div className="analysis-result">Average Speed Content</div>}
            {showMinimumSpeed && <div className="analysis-result">Minimum Speed Content</div>}
          </div>
        )}

        {isOverallAnalysisVisible && (
          <div className="analysis-content overall-analysis">
            <h2>Overall Analysis</h2>
            <div className="overall-analysis-options">
              {/* Left Column */}
              <div className="overall-column">
                <label>
                  <input
                    type="checkbox"
                    checked={halts}
                    onChange={() => {
                      console.log("Halts toggled to:", !halts);
                      setHalts(!halts);
                    }}
                  />
                  Halts
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showTimeAtHalt}
                    onChange={handleTimeAtHaltChange}
                  />
                  Time at Halt
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showBPT}
                    onChange={handleBPTChange}
                  />
                  BPT
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showBFT}
                    onChange={handleBFTChange}
                  />
                  BFT
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showRunAt}
                    onChange={handleRunAtChange}
                  />
                  Run at almost max speed
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={usr}
                    onChange={() => {
                      console.log("Unnecessary Speed Reductions toggled to:", !usr);
                      setUsr(!usr);
                    }}
                  />
                  Unnecessary Speed Reductions
                </label>
              </div>
              {/* Right Column */}
              <div className="overall-column">
                <label>
                  <input
                    type="checkbox"
                    checked={showUnscheduleHalts}
                    onChange={handleUnscheduleHaltsChange}
                  />
                  Unscheduled Halts
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showRunAtMax}
                    onChange={handleRunAtMaxChange}
                  />
                  Run at Max Speed
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showOverspeed}
                    onChange={handleOverspeedChange}
                  />
                  Overspeed
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showOverspeedInSR}
                    onChange={handleOverspeedInSRChange}
                  />
                  Overspeed in SR
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showSuddenSpeedIncrease}
                    onChange={handleSuddenSpeedIncreaseChange}
                  />
                  Sudden Speed Increase
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={showSuddenSpeedDecrease}
                    onChange={handleSuddenSpeedDecreaseChange}
                  />
                  Sudden Speed Decrease
                </label>
              </div>
            </div>

            {/* Render the Chart */}
            {data.length > 0 ? (
              <ResponsiveContainer width="90%" height={400}>
                <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="distance"
                    type="number"
                    domain={xDomain}
                    label={{ value: "Distance", position: "insideBottom", offset: -5 }}
                  />
                  <YAxis domain={[0, 10]} label={{ value: "Speed", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="speed" stroke="#8884d8" />

                  {/* Render Halts markers */}
                  {halts &&
                    haltPoints.map((point, idx) => (
                      <ReferenceArea
                        key={`halt-${idx}`}
                        x1={point.distance - 0.1}
                        x2={point.distance + 0.1}
                        stroke="red"
                        label={{ value: "Halt", position: "top", fill: "red", fontSize: 12 }}
                        fill="rgba(255,0,0,0.3)"
                      />
                    ))}

                  {/* Render Section markers (Yes/No) when Unnecessary Speed Reductions (usr) is checked */}
                  {usr &&
                    sectionMarkers.map((section, idx) => (
                      <ReferenceArea
                        key={`section-${idx}`}
                        x1={section.start_distance}
                        x2={section.end_distance}
                        stroke={section.unnecessary ? "red" : "green"}
                        label={{
                          value: section.unnecessary ? "Yes" : "No",
                          position: "insideTop",
                          fill: section.unnecessary ? "red" : "green",
                          fontSize: 12
                        }}
                        fill={section.unnecessary ? "rgba(255,0,0,0.1)" : "rgba(0,255,0,0.1)"}
                      />
                    ))}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p>No file uploaded. Please go back and upload a file.</p>
            )}
          </div>
        )}
      </div>

      {/* Conditional rendering of analysis result texts */}
      {halts && <div className="analysis-result">Halts Content</div>}
      {showTimeAtHalt && <div className="analysis-result">Time at Halt Content</div>}
      {showBPT && <div className="analysis-result">BPT Content</div>}
      {showBFT && <div className="analysis-result">BFT Content</div>}
      {showRunAt && <div className="analysis-result">Run at almost max speed Content</div>}
      {showUnscheduleHalts && <div className="analysis-result">Unscheduled Halts Content</div>}
      {showRunAtMax && <div className="analysis-result">Run at Max Speed Content</div>}
      {showOverspeed && <div className="analysis-result">Overspeed Content</div>}
      {showOverspeedInSR && <div className="analysis-result">Overspeed in SR Content</div>}
      {showSuddenSpeedIncrease && <div className="analysis-result">Sudden Speed Increase Content</div>}
      {showSuddenSpeedDecrease && <div className="analysis-result">Sudden Speed Decrease Content</div>}
    </div>
  );
};

export default SpmGraphPage;

