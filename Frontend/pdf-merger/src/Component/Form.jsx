import { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Form = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current);

    try {
      const response = await fetch("http://localhost:5000/merge", {
        method: "POST",
        body: formData,
      });

      if (response.redirected) {
        // Wait 4 seconds (not 3) before opening the merged PDF
        setTimeout(() => {
          window.open(response.url, "_blank");
          setLoading(false);
          if (formRef.current) formRef.current.reset();
        }, 4000);
      } else {
        console.log("Merge failed or no redirect received");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#FFA500", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav className="navbar navbar-dark" style={{ backgroundColor: "#FF6F00" }}>
        <h2 className="navbar-brand mx-auto font-weight-bold">
          PDFX - Merge Tool
        </h2>
      </nav>

      {/* Main Container */}
      <div className="container d-flex flex-column justify-content-center align-items-center py-5">
        <h1 className="mb-4 text-center text-white font-weight-bold">
          Merge Your PDF Files in Seconds
        </h1>

        <div
          className="card p-4 shadow"
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <form
            ref={formRef}
            className="d-flex flex-column gap-3"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="pdf1" className="font-weight-bold mb-2">
                Upload First PDF
              </label>
              <input
                type="file"
                name="pdfs"
                className="form-control"
                id="pdf1"
                accept=".pdf"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pdf2" className="font-weight-bold mb-2">
                Upload Second PDF
              </label>
              <input
                type="file"
                name="pdfs"
                className="form-control"
                id="pdf2"
                accept=".pdf"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-block font-weight-bold text-white mt-3"
              style={{
                backgroundColor: loading ? "#ccc" : "#FF6F00",
                borderColor: "#FF6F00",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Merging..." : "Merge PDFs"}
            </button>

            {loading && (
              <p className="text-center mt-2 text-secondary">
                Please wait while we merge your PDFs...
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
