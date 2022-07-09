import '../App.css';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Header() {
  const [mobilesitebartaggle, setMobilesitebartaggle] = useState(false);
  const [login, setLogin] = useState(false);
  

  useEffect(() => {
    setInterval(function () {
      try {
        const token = localStorage.getItem("token")
        if(token){
          setLogin(!login);
        }        
      } catch (err) {
      }
    }, 100);
  }, [])




  const logoutfun = () => {
    var user = localStorage.removeItem("token");
      toast("Log out");
      setLogin(false)
      
  }

  const loginfun = ()=>{
    alert("Login")
  }


  return (
    <>
      <div className="header">
        <Link to="/"><div className="logo"><img src="https://kfcbd.com/frontend/Content/OnlineOrderingImages/Shared/md/logo_kfc.svg" width="50px" /></div></Link>
        <div className="singin">{login ? <span onClick={() => logoutfun()}>Logout</span>: <span onClick={() => loginfun()}>Login</span>}</div>
        <div className="toggle" onClick={() => setMobilesitebartaggle(!mobilesitebartaggle)}><img src="../toggle.jpg" /></div>
      </div>

      {mobilesitebartaggle &&
        <div className="mobile_sitebar">

          <div className="welcome">
            <div className="guest">
              Welcome <br />
              <h1>GUEST!</h1>
            </div>
            <div className="profile" onClick={() => setMobilesitebartaggle(!mobilesitebartaggle)}>
              <img src="../img/profile.jpg" />
            </div>
          </div>

          <div className="sing_list">
            <li>SIGN IN </li>
            <li>menu </li>
            <li>ABOUT KFC</li>
            <li>FEEDBACK</li>
            <li>CONTACT US</li>
            <li>BRAND T & C</li>
            <li>FAQ</li>
            <li>SITE MAP</li>
            <li>FIND A KFC</li>
          </div>


        </div>
      }


      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </>
  );
}

export default Header;
