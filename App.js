                                                           import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import sakarLogo from "./sakar.png"; // Ensure the logo is located in the src folder.
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"; // Import Router and Routes
import SectionalMPS from './SectionalMPS'; // Import the SectionalMPS component
import SpmReport from "./SPMReport";
import CvvrsReport from "./cvvrsreport";
import SpmGraph from "./spmgraph";
import Header from "./header";

const API_URL = "http://127.0.0.1:45448/upload_video/"; // Backend API URL


function App() {
  // State Variables
  const [trainNo, setTrainNo] = useState("");
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
  
  const [lpName,setlpname] = useState("");
  const [lpDesignation,setlpdesignation] = useState("");
  const [alpName,setalpname] = useState("");
  const [alpDesignation,setalpdesignation] = useState("");
  
  const [file, setFile] = useState(null);
  
  const handleRadioChange = (e) => {
     setSelectedOption(e.target.value);
    setGoodsOption(""); // Reset goods option when switching between "goods" and "chg"
    setLoadAmount("");  // Reset load amount when switching between "goods" and "chg"
  };
  
  const handleDropdownChange = (e) => {
    setGoodsOption(e.target.value); // Capture selected dropdown value
    setLoadAmount(""); // Reset load amount if dropdown value changes
  };
  
  const handleTrainNoChange = (e) => {
  // Allow only numbers (0-9)
  const value = e.target.value;
  if (/^\d*$/.test(value)) {
    setTrainNo(value); // Only update the state if the value is numeric
  }
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
  
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  
  // Handler functions for the checkboxes
  const handleCheckbox1Change = (e) => {
  setCheckbox1(e.target.checked);
};

  const handleCheckbox2Change = (e) => {
  setCheckbox2(e.target.checked);
};

  const handleGenerateSpmReport = () => {
  // Add logic to generate SPM report here
  navigate("/spm-report");
};

  const handleGenerateCvvrsReport = () => {
  // Add logic to generate CVVRS report here
  navigate("/cvvrs-report");
};
  
  const handleGenerateSpmGraph = () => {
  // Add your logic to generate SPM graph here
  navigate("/spm-graph");
};

  const handleGenerateSummaryVideo = () => {
  // Add your logic to generate summary video here
  alert("Generating Summary Video...");
};
  
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  
  const handleNavigate = () => {
    if (file) {
      navigate("/spm-graph", { state: { file } }); // Pass file data to /graph
    }
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
  
  const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log("Selected file:", file.name);
    // Add logic to process the Excel file
  }
};

  
  const handleUploadFileClick = () => {
    alert("Upload File Button Clicked");
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!trainNo || isNaN(trainNo)) {
    alert("Please enter a valid numeric Train Number.");
    return;
  }

    
    const formData = new FormData();
    formData.append("file", video);

    setIsUploading(true);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProcessedVideoURL(response.data.processed_video_url);
      alert("Video uploaded and processing started!");
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload and process the video.");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle crew detail changes
  const handleCrewDetailChange = (e) => {
    const { name, value } = e.target;
    setCrewDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
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
      <Header /> {/* Use the Header component here */}
      
      
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
                onChange={handleTrainNoChange}
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
      value={lpName}
      onChange={(e) => setlpname(e.target.value)}
      name="lpName"
      required
    />
  </div>

  <div className="form-group">
    <label>Loco Pilot Designation:</label>
    <input
      type="text"
      value={lpDesignation}
      onChange={(e) =>setlpdesignation(e.target.value)}
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
      value={alpName}
      onChange={(e) => setalpname(e.target.value)}
      name="alpName"
      required
    />
  </div>

  <div className="form-group">
    <label>Auto Loco Pilot Designation:</label>
    <input
      type="text"
      value={alpDesignation}
      onChange={(e) => setalpdesignation(e.target.value)}
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

  <div className="form-row">
  <div className="form-group">
    <label>SPM Type:</label>
    <select
      value={crewDetails.lpDesignation} // Bind the value to the state
      onChange={(e) => handleCrewDetailChange(e)} // Use the same handler for change
      name="lpDesignation" // Update the state with the name of the field
      required
    >
      <option value="">Select SPM Type</option>
      <option value="Medha">Medha</option>
      <option value="Laxven">Laxven</option>
      <option value="Telpro">Telpro</option>
    </select>
  </div>
</div>

          </div>

         
   </div>
  

        {/* Right Panel: Crew Details */}
        
        <div className="crew-details">
  

  {/* Button and Radio Buttons Row */}
  <div className="button-row">
    {/* Sectional MPS Button */}
    <div className="sectional">
      <button type="button" onClick={handleSectionalMpsClick}>
        Caution Order
      </button>
    </div>
    
  
    {/* Goods Radio Button */}
    <div className="form-group">
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
    </div>

    {/* CHG Radio Button */}
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
  </div>

  {/* Conditional Dropdown for Goods */}
{selectedOption === "goods" && (
  <div className="form-group" style={{ textAlign: "right" }}>
    <label>Select Goods Type:</label>
    <select 
      value={goodsOption} 
      onChange={handleDropdownChange}
      style={{ marginLeft: "auto", display: "block", width: "fit-content" }}
    >
      <option value="">Select an option</option>
      <option value="Loaded (BMBS)">Loaded (BMBS)</option>
      <option value="Loaded (CONV)">Loaded (CONV)</option>
      <option value="Unloaded (BMBS)">Unloaded (BMBS)</option>
      <option value="Unloaded (CONV)">Unloaded (CONV)</option>
    </select>
  </div>
)}

{/* Load Amount Input Field */}
{selectedOption === "goods" && (goodsOption === "Loaded (BMBS)" || goodsOption === "Loaded (CONV)") && (
  <div className="form-group" style={{ textAlign: "right" }}>
    <label>Load Amount (in tons):</label>
    <input
      type="number"
      value={loadAmount}
      onChange={handleLoadAmountChange}
      placeholder="Enter load amount"
      style={{ marginLeft: "auto", display: "block", width: "fit-content" }}
    />
  </div>
)}

{/* Upload File Button */}
    <div className="upload-file">
      <button type="button" onClick={handleUploadFileClick}>
        Upload File
      </button>
    </div>
    
    {/* Checkboxes */}
<div className="checkbox-group">
  <label className="checkbox-container">
    <input
      type="checkbox"
      name="checkbox1"
      checked={checkbox1}
      onChange={handleCheckbox1Change}
    />
    SPM
  </label>
  <label className="checkbox-container">
    <input
      type="checkbox"
      name="checkbox2"
      checked={checkbox2}
      onChange={handleCheckbox2Change}
    />
    CVVRS
  </label>
</div>
    
<div className="form-row">
            <div className="form-group">
              <input
                type="file"
                accept={supportedFormats.join(", ")}
                onChange={handleVideoChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
  <input
    type="file"
    accept=".xlsx, .xls"
    onChange={handleFileUpload}
    
    required
  />
</div>

          </div>
          
          
          
          {/* Report Buttons */}
<div className="report-buttons">
  <button
    type="button"
    onClick={handleGenerateSpmReport}
    className="spm-report"
  >
    Generate SPM Report
  </button>
  <button
    type="button"
    onClick={handleGenerateCvvrsReport}
    className="cvvrs-report"
  >
    Generate CVVRS Report
  </button>
</div>

{/* Additional Report Buttons */}
<div className="additional-report-buttons">
  <button
    type="button"
    onClick={handleNavigate}
    className="spm-graph"
  >
    Generate SPM Graph
  </button>
  <button
    type="button"
    onClick={handleGenerateSummaryVideo}
    className="summary-video"
  >
    Generate Summary Video
  </button>
</div>

</div>

      </div>

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

