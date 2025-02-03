import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import sakarLogo from "./sakar.png"; // Ensure the logo is located in the src folder.
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"; // Import Router and Routes
import SectionalMPS from './SectionalMPS'; // Import the SectionalMPS component
//import TrainPathFetcher from './Train_path';
//const API_URL = "http://127.0.0.1:45448/upload_video/"; // Backend API URL

const API_URL = "http://127.0.0.1:8000/train_path/"; 
function App() {
  // State Variables
  //const [trainNo, setTrainNo] = useState("");
  const [locoNo, setLocoNo] = useState(""); // Added Loco No. state
  const [inspectorName, setInspectorName] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [video, setVideo] = useState(null);
  const [processedVideoURL, setProcessedVideoURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [reportID, setReportID] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  const [goodsOption, setGoodsOption] = useState("");
  const [loadAmount, setLoadAmount] = useState("");
  const [trainNo, setTrainNo] = useState("");
  const [trainPath, setTrainPath] = useState({}); // State to store the fetched train path
  const [error, setError] = useState(""); // State to handle errors
  
  const handleRadioChange = (e) => {
     setSelectedOption(e.target.value);
    setGoodsOption(""); // Reset goods option when switching between "goods" and "chg"
    setLoadAmount("");  // Reset load amount when switching between "goods" and "chg"
  };
  
  const handleDropdownChange = (e) => {
    setGoodsOption(e.target.value); // Capture selected dropdown value
    setLoadAmount(""); // Reset load amount if dropdown value changes
  };
  
  const handleLoadAmountChange = (e) => {
    setLoadAmount(e.target.value);
  };
  
  const [crewDetails, setCrewDetails] = useState({
    lpName: "",
    alpName: "",
    lpDesignation: "",
    alpDesignation: "",
    lpActivity: "",
    alpActivity: "",
    lpActivity2: "",
    alpActivity2: "",
    lpActivity3: "",
    alpActivity3: "",
    lpActivity4: "",
    alpActivity4: "",
    lpActivity5: "",
    alpActivity5: "",
    lpName2: "",
    alpName2: "",
    lpDesignation2: "",
    alpDesignation2: "",
    lpName3: "",
    alpName3: "",
    lpDesignation3: "",
    alpDesignation3: "",
    lpName4: "",
    alpName4: "",
    lpDesignation4: "",
    alpDesignation4: "",
  });

  const supportedFormats = ["video/mp4", "video/webm", "video/ogg"];
  
  // Handle train number input change
  const handleInputChange = (e) => {
    setTrainNo(e.target.value);
  };

  // WebSocket for Real-Time Video URL Updates
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.processed_video_url) {
        setProcessedVideoURL(data.processed_video_url);
      }
    };
    return () => ws.close();
  }, []);

  // Handle video file input
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && supportedFormats.includes(file.type)) {
      setVideo(file);
    } else {
      alert("Unsupported video format! Please upload MP4, WebM, or Ogg.");
    }
  };
  
  const handleCrewDetailChange = (e) => {
    const { name, value } = e.target;
    setCrewDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!trainNo) {
      setError("Please enter a valid train number.");
      return;
    }
    const formData = new FormData();
    formData.append("file", video);

    setIsUploading(true);

    try {
      // Fetch train path details from the backend API
      const response = await axios.get(`${API_URL}${trainNo}`);
      const { "1st_stop": firstStop, "2nd_stop": secondStop, "3rd_stop": thirdStop, total_distance, avg_psr,max_psr,min_psr, stops, TYPE} = response.data;

      // Update the crewDetails state with the fetched train path details
      setCrewDetails((prevDetails) => ({
        ...prevDetails,
        lpActivity: firstStop,
        alpActivity: secondStop,
        lpActivity2: secondStop,
        alpActivity2: thirdStop,
        lpActivity3: total_distance,
        alpActivity3: avg_psr,
        lpActivity4: max_psr,
        alpActivity4: min_psr,
        lpActivity5: stops,
        alpActivity5: TYPE 
        
        
      }));

      setError(""); // Clear any previous errors
    } catch (error) {
      setError("Error fetching train path. Please try again.");
      console.error("Error fetching train path:", error);
    }
  };

  // Use navigate hook for routing
  const navigate = useNavigate();
  
  // Handle Button Clicks
  const handleSectionalMpsClick = () => {
    navigate("/sectionalmps"); // Navigate to Sectional MPS page
  };
  
   const handleGoodsClick = () => {
    alert(`Selected Goods Option: ${goodsOption}`);
  };

  const handleChgClick = () => {
    alert("CHG Button Clicked");
  };
  
  return (
    <div className="app-container">
      {/* Header Section with Orange Color Block */}
      <div className="header-bar">
        <div className="logo-container">
          <img src={sakarLogo} alt="Sakar Robotics Logo" className="sakar-logo" />
        </div>
        <h1 className="cvvrs-text">CVVRS and SPM Analysis</h1>
      </div>

      {/* Main Dashboard Layout */}
      <div className="dashboard-layout">
        {/* Left Panel: Form */}
        <div className="form-container">
          

          {/* Form row for parallel fields */}
          <div className="form-row">
            <div className="form-group">
              <label>Train Number:</label>
              <input
                type="text"
                value={trainNo}
                onChange={(e) => setTrainNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Journey Date:</label>
              <input
                type="date"
                value={inspectionDate}
                onChange={(e) => setInspectionDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Added fields below Train Number and Journey Date */}
          <div className="form-row">
            <div className="form-group">
              <label>Loco No.:</label>
              <input
                type="text"
                value={locoNo}
                onChange={(e) => setLocoNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Inspector Name:</label>
              <input
                type="text"
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Report ID:</label>
              <input
                type="text"
                value={reportID}
                onChange={(e) => setReportID(e.target.value)} // Update state when value changes
                required
              />
            </div>

            {/* Today's Date input */}
            <div className="form-group">
              <label>Today's Date:</label>
              <input
                type="date"
                value={new Date().toISOString().split('T')[0]}  // Dynamically set today's date
                readOnly
              />
            </div>
          </div>

          
          
          {/* Added Loco Pilot Name and Designation below Report ID and Today's Date */}
<div className="form-row">
  <div className="form-group">
    <label>Loco Pilot Name:</label>
    <input
      type="text"
      value={crewDetails.lpName}
      onChange={(e) => handleCrewDetailChange(e)}
      name="lpName"
      required
    />
  </div>

  <div className="form-group">
    <label>Loco Pilot Designation:</label>
    <input
      type="text"
      value={crewDetails.lpDesignation}
      onChange={(e) => handleCrewDetailChange(e)}
      name="lpDesignation"
      required
    />
  </div>
</div>

        {/* Added Auto Loco Pilot Name and Designation */}
<div className="form-row">
  <div className="form-group">
    <label>Auto Loco Pilot Name:</label>
    <input
      type="text"
      value={crewDetails.lpName}
      onChange={(e) => handleCrewDetailChange(e)}
      name="lpName"
      required
    />
  </div>

  <div className="form-group">
    <label>Auto Loco Pilot Designation:</label>
    <input
      type="text"
      value={crewDetails.lpDesignation}
      onChange={(e) => handleCrewDetailChange(e)}
      name="lpDesignation"
      required
    />
  </div>
</div>

{/* Added Start KM and SPM type */}
<div className="form-row">
  <div className="form-group">
    <label>Start KM:</label>
    <input
      type="text"
      value={crewDetails.lpName}
      onChange={(e) => handleCrewDetailChange(e)}
      name="lpName"
      required
    />
  </div>

  <div className="form-group">
    <label>SPM Type:</label>
    <input
      type="text"
      value={crewDetails.lpDesignation}
      onChange={(e) => handleCrewDetailChange(e)}
      name="lpDesignation"
      required
    />
  </div>
</div>

  </div>        
   

        {/* Right Panel: Crew Details */}
        <div className="crew-details">
          <div className="crew-buttons">
          
    <button type="button" onClick={handleSectionalMpsClick}>
      Sectional MPS
    </button>
  
  
  
    <label className="radio-container">
      <input
        type="radio"
        name="goodsChg"
        value="goods"
        checked={selectedOption === "goods"}
        onChange={handleRadioChange}
        className="radio-input"
      />
      <span className="radio-circle"></span>
      Goods
    </label>
  

  <div className="form-group">
    <label className="radio-container">
      <input
        type="radio"
        name="goodsChg"
        value="chg"
        checked={selectedOption === "chg"}
        onChange={handleRadioChange}
        className="radio-input"
      />
      <span className="radio-circle"></span>
      CHG
    </label>
  </div>
  
  {/* Conditional Dropdown for Goods */}
            {selectedOption === "goods" && (
              <div className="form-group">
                <label>Select Goods Type:</label>
                <select value={goodsOption} onChange={handleDropdownChange}>
                  <option value="">Select an option</option>
                  <option value="Loaded (BMBS)">Loaded (BMBS)</option>
                  <option value="Loaded (CONV)">Loaded (CONV)</option>
                  <option value="Unloaded (BMBS)">Unloaded (BMBS)</option>
                  <option value="Unloaded (CONV)">Unloaded (CONV)</option>
                </select>
              </div>
            )}
            
            {/* Show Load Amount input field if "Goods" and either "Loaded (BMBS)" or "Loaded (CONV)" is selected */}
            {selectedOption === "goods" && (goodsOption === "Loaded (BMBS)" || goodsOption === "Loaded (CONV)") && (
              <div className="form-group">
                <label>Load Amount (in tons):</label>
                <input
                  type="number"
                  value={loadAmount}
                  onChange={handleLoadAmountChange}
                  placeholder="Enter load amount"
                />
              </div>
            )}
        </div>
      
 </div>     
      
</div>
      {/* Display fetched train path in activity text boxes */}
       
      
      {/* Processed Video Display */}
      {processedVideoURL && (
        <div className="processed-video-container">
          <h2>Processed Video</h2>
          <video controls>
            <source src={processedVideoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      
    </div>
  );
}

export default App;

