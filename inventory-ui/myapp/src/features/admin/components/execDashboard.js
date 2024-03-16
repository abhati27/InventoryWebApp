import { useState } from "react";
import "../../../App.css";
import axios from "axios";

function ExecutiveOnboard() {
  const [executive, setExecutive] = useState({
    name: "",
    contact: "",
    title: "",
    user: {
      username: "",
      password: "",
    },
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e, field, nestedField) => {
    if (nestedField) {
      setExecutive({
        ...executive,
        [field]: {
          ...executive[field],
          [nestedField]: e.target.value,
        },
      });
    } else {
      setExecutive({ ...executive, [field]: e.target.value });
    }
  };

  const processForm = async (e) => {
    e.preventDefault();

    // Simple front-end validation
    if (
      !executive.name ||
      !executive.contact ||
      !executive.title ||
      !executive.user.username ||
      !executive.user.password
    ) {
      setErrorMsg("Please fill out all fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8282/executive/add", executive);
      setSuccessMsg("Executive info Added");
      setErrorMsg(""); // clear error if any
    } catch (err) {
      setErrorMsg("Error adding info, please contact IT");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f7f7f7",
      }}
    >
      <div
        style={{
          width: "60%",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3>Executive Onboarding</h3>

        {successMsg && (
          <div className="alert alert-primary" role="alert">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        )}
        {loading && (
          <div className="alert alert-info" role="alert">
            Submitting...
          </div>
        )}

        <br />
        <form
          className="row g-3"
          onSubmit={processForm}
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={executive.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Contact</label>
            <input
              type="text"
              className="form-control"
              value={executive.contact}
              onChange={(e) => handleInputChange(e, "contact")}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={executive.title}
              onChange={(e) => handleInputChange(e, "title")}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input
              type="email"
              className="form-control"
              value={executive.user.username}
              onChange={(e) => handleInputChange(e, "user", "username")}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={executive.user.password}
              onChange={(e) => handleInputChange(e, "user", "password")}
            />
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              Add Executive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExecutiveOnboard;
