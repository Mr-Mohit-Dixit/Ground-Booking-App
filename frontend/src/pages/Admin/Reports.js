import React, { useState } from "react";

const Report = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const downloadReport = async () => {
    setLoading(true);
    setError("");
    try {
      let url = "http://localhost:5091/api/admin/reports";

      // Add query params if dates selected
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      // Create download link for CSV file
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      // Extract filename from content-disposition header or fallback name
      const disposition = response.headers.get("content-disposition");
      let filename = "GroundBookingReport.csv";
      if (disposition && disposition.indexOf("filename=") !== -1) {
        const match = disposition.match(/filename="?(.+)"?/);
        if (match.length === 2) filename = match[1];
      }

      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || "Failed to download report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Generate & Download Report</h2>
      {/* Date range inputs */}
      <div className="mb-3">
        <label className="form-label">Start Date</label>
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <br />
      <div className="mb-3">
        <label className="form-label">End Date</label>
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <br />
      <button
        className="btn btn-primary"
        onClick={downloadReport}
        disabled={loading}
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            Generating...
          </>
        ) : (
          "Download CSV Report"
        )}
      </button>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      <hr />

      <p>
        Click the button above to generate a CSV report of the ground booking
        data. The report will download automatically.
      </p>
    </div>
  );
};

export default Report;
