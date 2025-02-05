import React, { useState } from "react";
import './spmgraph.css'; // Import the CSS file to style the page

const SpmGraphPage = () => {
  // State to track visibility of each analysis
  const [isSpeedAnalysisVisible, setIsSpeedAnalysisVisible] = useState(true);
  const [isOverallAnalysisVisible, setIsOverallAnalysisVisible] = useState(true);

  // State to track visibility of individual Speed Analysis options
  const [showMPS, setShowMPS] = useState(false);
  const [showAverageSpeed, setShowAverageSpeed] = useState(false);
  const [showMinimumSpeed, setShowMinimumSpeed] = useState(false);

  // State to track visibility of individual Overall Analysis options
  const [showHalts, setShowHalts] = useState(false);
  const [showTimeAtHalt, setShowTimeAtHalt] = useState(false);
  const [showUnnecessarySpeed, setShowUnnecessarySpeed] = useState(false);
  const [showBPT, setShowBPT] = useState(false);
  const [showBFT, setShowBFT] = useState(false);
  const [showRunAt, setShowRunAt] = useState(false);
  const [showUnscheduleHalts, setShowUnscheduleHalts] = useState(false);
  const [showRunAtMax, setShowRunAtMax] = useState(false);
  const [showOverspeed, setShowOverspeed] = useState(false);
  const [showOverspeedInSR, setShowOverspeedInSR] = useState(false);
  const [showSuddenSpeedIncrease, setShowSuddenSpeedIncrease] = useState(false);
  const [showSuddenSpeedDecrease, setShowSuddenSpeedDecrease] = useState(false);

  // Handle checkbox change for Speed Analysis visibility
  const handleSpeedAnalysisChange = (e) => {
    setIsSpeedAnalysisVisible(e.target.checked);
  };

  // Handle checkbox change for Overall Analysis visibility
  const handleOverallAnalysisChange = (e) => {
    setIsOverallAnalysisVisible(e.target.checked);
  };

  // Handle changes for individual Speed Analysis options
  const handleMPSChange = (e) => {
    setShowMPS(e.target.checked);
  };

  const handleAverageSpeedChange = (e) => {
    setShowAverageSpeed(e.target.checked);
  };

  const handleMinimumSpeedChange = (e) => {
    setShowMinimumSpeed(e.target.checked);
  };

  // Handle changes for individual Overall Analysis options
  const handleHaltsChange = (e) => {
    setShowHalts(e.target.checked);
  };

  const handleTimeAtHaltChange = (e) => {
    setShowTimeAtHalt(e.target.checked);
  };

  const handleUnnecessarySpeedChange = (e) => {
    setShowUnnecessarySpeed(e.target.checked);
  };

  const handleBPTChange = (e) => {
    setShowBPT(e.target.checked);
  };

  const handleBFTChange = (e) => {
    setShowBFT(e.target.checked);
  };

  const handleRunAtChange = (e) => {
    setShowRunAt(e.target.checked);
  };

  const handleUnscheduleHaltsChange = (e) => {
    setShowUnscheduleHalts(e.target.checked);
  };

  const handleRunAtMaxChange = (e) => {
    setShowRunAtMax(e.target.checked);
  };

  const handleOverspeedChange = (e) => {
    setShowOverspeed(e.target.checked);
  };

  const handleOverspeedInSRChange = (e) => {
    setShowOverspeedInSR(e.target.checked);
  };

  const handleSuddenSpeedIncreaseChange = (e) => {
    setShowSuddenSpeedIncrease(e.target.checked);
  };

  const handleSuddenSpeedDecreaseChange = (e) => {
    setShowSuddenSpeedDecrease(e.target.checked);
  };

  return (
    <div className="spm-graph-page">
      <h1>SPM Graph Analysis</h1>

      {/* Checkboxes to toggle visibility of Speed and Overall Analysis */}
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

            {/* Checkboxes for Speed Analysis details */}
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

            {/* Conditional rendering based on checkbox selections */}
            {showMPS && <div className="analysis-result">MPS Content</div>}
            {showAverageSpeed && <div className="analysis-result">Average Speed Content</div>}
            {showMinimumSpeed && <div className="analysis-result">Minimum Speed Content</div>}
          </div>
        )}

        {isOverallAnalysisVisible && (
          <div className="analysis-content overall-analysis">
            <h2>Overall Analysis</h2>

            {/* Checkboxes for Overall Analysis details */}
<div className="overall-analysis-options">
  {/* Left Column (First 6 checkboxes) */}
  <div className="overall-column">
    <label>
      <input
        type="checkbox"
        checked={showHalts}
        onChange={handleHaltsChange}
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
        checked={showUnnecessarySpeed}
        onChange={handleUnnecessarySpeedChange}
      />
      Unnecessary Speed
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
      Run at
    </label>
  </div>

  {/* Right Column (Next 6 checkboxes) */}
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
      Run at Max
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


            {/* Conditional rendering based on checkbox selections */}
            {showHalts && <div className="analysis-result">Halts Content</div>}
            {showTimeAtHalt && <div className="analysis-result">Time at Halt Content</div>}
            {showUnnecessarySpeed && <div className="analysis-result">Unnecessary Speed Content</div>}
            {showBPT && <div className="analysis-result">BPT Content</div>}
            {showBFT && <div className="analysis-result">BFT Content</div>}
            {showRunAt && <div className="analysis-result">Run at Content</div>}
            {showUnscheduleHalts && <div className="analysis-result">Unschedule Halts Content</div>}
            {showRunAtMax && <div className="analysis-result">Run at Max Content</div>}
            {showOverspeed && <div className="analysis-result">Overspeed Content</div>}
            {showOverspeedInSR && <div className="analysis-result">Overspeed in SR Content</div>}
            {showSuddenSpeedIncrease && <div className="analysis-result">Sudden Speed Increase Content</div>}
            {showSuddenSpeedDecrease && <div className="analysis-result">Sudden Speed Decrease Content</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpmGraphPage;

