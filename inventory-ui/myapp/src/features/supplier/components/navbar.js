import { useState } from "react";
import {  useNavigate } from "react-router";

function Navbar(){
  const navigate = useNavigate();
  const [username,] = useState(localStorage.getItem('username'))
    return(
        <nav className="navbar  bg-primary  data-bs-theme=dark  navbar-expand-lg  " 
        style={{color: '#ffffff'}}>
        <div className="container-fluid ">
          <a className="navbar-brand " href="Javascript.void(0)" style={{color: '#ffffff'}}>Supplier Dashboard</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="nav-link active button-link-light" style={{color: '#ffffff'}} aria-current="page" onClick={()=>navigate('/executive?page=sales_stats')}>Sales Stats</button>
              </li>
              &nbsp;&nbsp;&nbsp;
              <li className="nav-item">
              <button className="nav-link active button-link"aria-current="page" style={{color: '#ffffff'}} onClick={()=>navigate('/executive?page=all_orders')}>All Orders</button>
              </li>
              &nbsp;&nbsp;&nbsp;
              <li className="nav-item">
              <button className="nav-link active button-link"aria-current="page" style={{color: '#ffffff'}} onClick={()=>navigate('/executive?page=order_stats')}>Order Stats</button>
              </li>
            </ul>
            <span>Welcome {username.split('@')[0]} &nbsp;&nbsp;</span>
            <form className="d-flex" role="search">
                
               <button className="btn btn-outline-warning"  type="submit">Logout</button>
            </form>
          </div>
        </div>
      </nav>
    )
}
export default Navbar; 