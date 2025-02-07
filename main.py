from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add your frontend origin(s) to this list.
origins = [
    "http://localhost:3001",  # Your current frontend origin
    # "http://localhost:3000",  # Add this if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Alternatively, use ["*"] for development (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Example section results (using Python booleans)
section_results = [
    {"section": "Section A", "start_distance": 130189.01, "end_distance": 130231.01, "unnecessary": True},
    {"section": "Section B", "start_distance": 130231.01, "end_distance": 130255.25, "unnecessary": False},
    {"section": "Section C", "start_distance": 130255.25, "end_distance": 130275.32, "unnecessary": False},
    {"section": "Section D", "start_distance": 130275.32, "end_distance": 130301.47, "unnecessary": True},
    {"section": "Section E", "start_distance": 130301.47, "end_distance": 130342.20, "unnecessary": True},
    {"section": "Section F", "start_distance": 130342.20, "end_distance": 130360.62, "unnecessary": True},
    {"section": "Section G", "start_distance": 130360.62, "end_distance": 130415.02, "unnecessary": True},
    {"section": "Section H", "start_distance": 130415.02, "end_distance": 130423.84, "unnecessary": False},
    {"section": "Section I", "start_distance": 130423.84, "end_distance": 130495.43, "unnecessary": True},
    {"section": "Section J", "start_distance": 130495.43, "end_distance": 130496.86, "unnecessary": False}
]

@app.get("/api/sectionResults")
def get_section_results():
    return section_results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

