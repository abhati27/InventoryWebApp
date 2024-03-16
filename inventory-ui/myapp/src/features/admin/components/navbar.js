import { useNavigate } from "react-router";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    // Redirect to main location
    window.location.href = "http://localhost:3000/";
  };

  const navigate = useNavigate();
  return (
    <nav className="navbar  navbar-expand-lg bg-body-tertiary ">
      <div className="container-fluid">
        <a className="navbar-brand" href="/admin">
          ADMIN Dashboard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className="nav-link active button-link"
                aria-current="page"
                onClick={() => navigate("/admin?page=executive_onboard")}
              >
                Executive Onboard
              </button>
            </li>
            &nbsp;&nbsp;&nbsp;
            <li className="nav-item">
              <button
                className="nav-link active button-link"
                aria-current="page"
                onClick={() => navigate("/admin?page=supplier_onboard")}
              >
                Supplier Onboard
              </button>
            </li>
            &nbsp;&nbsp;&nbsp;
            <li className="nav-item">
              <button
                className="nav-link active button-link"
                aria-current="page"
                onClick={() => navigate("/admin?page=manager_onboard")}
              >
                Manager Onboard
              </button>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <button
              className="btn btn-outline-success"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
