import '../App.css';
import React, { useState, useEffect } from 'react';




function Userinfo() {






  const ordernow = () => {
    const tokenvalue = JSON.parse(localStorage.getItem('token'));
    var token = { "column_type": "token", "field": tokenvalue };

    fetch('/userInfo', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Key': 'aHR0cHN+Y3VycnltZWFsLmFlfmFwaQ',
        'X-Auth-Email': 'info@currymeal.ae'
      },
      body: JSON.stringify(token),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.content);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }



  return (
    <>
      <div className="col-md-6" style={{ backgroundColor: 'rgb(236 235 239 / 74%)', paddingTop: '20px', paddingBottom: '20px' }}>
        <center><button type="button" class="btn btn-primary btn-lg btn-block" onClick={() => ordernow()}>Order Now</button></center>
      </div>
    </>
  );
}

export default Userinfo;
