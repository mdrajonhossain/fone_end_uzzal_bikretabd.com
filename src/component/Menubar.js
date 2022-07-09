import '../App.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Menubar() {
  const [addtocartdatacount, setAddtocartdatacount] = useState();

  useEffect(() => {
    window.addEventListener('scroll', function () {
      try {
        if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
          document.getElementById("main_menubar").classList.remove('main_menubar');
          document.getElementById("main_menubar").classList.add('header_fix');
        } else {
          document.getElementById("main_menubar").classList.remove('header_fix');
          document.getElementById("main_menubar").classList.add('main_menubar');
        }
      } catch (error) {
        console.log(error)
      }
    });
  },[]);


  useEffect(() => {
    setInterval(function () {
      var addtocart = JSON.parse(localStorage.getItem("addtocart") || "[]");
      setAddtocartdatacount(addtocart.length)
    }, 100);
  }, [setInterval])
  
  return (
    <>
      <div className="main_menubar" id="main_menubar">
      <div className="menubar">
        <div className="links"><Link to="/menu" style={{color:'white', textDecoration: 'none'}}><img src="../img/delivery.png" style={{width:"45px", height:'46px'}}/>Delivery</Link></div>
        <div className="links"><img src="../img/takeaway.png" style={{width:"45px", height:'38px'}}/>Takeaway</div>
        <div className="links"><img src="../img/dining.png" style={{width:"45px", height:'38px'}}/>Dine-in</div>
        <div className="links"><Link to="/addtocart" style={{color:'green', textDecoration: 'none'}}><img src="../img/shoping.png" style={{width:"45px", height:'38px'}}/><b>{addtocartdatacount}</b></Link></div>
      </div>
        
      </div>
    </>
  );
}

export default Menubar;
