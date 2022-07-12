import React from 'react';
import { NavLink } from 'react-bootstrap';
import './Navber.css';
import { Link } from "react-router-dom";






function Navber() {
	 const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);


  return (
    <>
     <div className="main-container"  onClick={()=>Close()} />
      <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <div className="nav-logo">            
            <span><Link to="/" className="nav-links">            
            বিক্রেতা বিডি . কম
            </Link></span>
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <span><Link to="/" className="nav-links">Home</Link></span>              
            </li>
            <li className="nav-item">              
                <span><Link to="/" className="nav-links">Sign In</Link></span>
            </li>
            <li className="nav-item">
              <span><Link to="/" className="nav-links" style={{position:'relative'}}>
              Shop 
              <span className="card_counter">5</span></Link></span>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navber;
