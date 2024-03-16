import { useState } from "react";
import "../../../App.css";
import axios from "axios";
function SupplierOnboard() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hno, setHno] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const processForm = (e) => {
    e.preventDefault();
    let supplier = {
      name: name,
      contact: contact,
      user: {
        username: username,
        password: password,
      },
      address: {
        hno: hno,
        street: street,
        city: city,
        zipcode: zip,
      },
    };
    const postSupplier = async () => {
      try {
        await axios.post("http://localhost:8282/supplier/add", supplier);
        setSuccessMsg("Supplier info Added");
      } catch (err) {
        setErrorMsg("Error adding info, pls contact IT");
      }
    };
    postSupplier();
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
        <h3>Supplier Onboarding</h3>

        {successMsg ? (
          <div className="alert alert-primary" role="alert">
            {successMsg}
          </div>
        ) : errorMsg ? (
          <div className="alert alert-danger" role="alert">
            {errorMsg}
          </div>
        ) : null}

        <form className="row g-3" onSubmit={(e) => processForm(e)}>
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Contact</label>
            <input
              type="text"
              className="form-control"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Username</label>
            <input
              type="email"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-2">
            <label className="form-label">HNo</label>
            <input
              type="text"
              className="form-control"
              value={hno}
              onChange={(e) => setHno(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Street Name</label>
            <input
              type="text"
              className="form-control"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Zip</label>
            <input
              type="text"
              className="form-control"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Add Supplier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SupplierOnboard;
