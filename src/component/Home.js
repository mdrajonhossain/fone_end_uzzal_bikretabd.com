import '../App.css';
import Navber from './Navber';
import React, { useState, useEffect } from 'react';
import Fooder from './Fooder';
import 'aos';
import AOS from 'aos';
import { Link } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";




function Home() {
  const [catagorey, setCatagorey] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 })   

    axios.get('http://screete.bikretabd.com/admin/cata_get_client')
        .then(response => {
          console.log(response.data.cat_data);
          setCatagorey(response.data.cat_data)
        })
        .catch(error => {            
            console.error('There was an error!', error);
        })
  },[axios]);
      
    



  return (
    <>
    {catagorey ? "" : <div className="loadding">Loadding</div> }
      <Navber /><br/>

      <div className="container">
        <div className="container_baner" data-aos="fade-down">
          <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="../img/carousel/01.jpg" class="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="../img/carousel/02.jpg" class="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="../img/carousel/03.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

          <div className="ordering" data-aos="fade-up">LET'S START ORDERING</div>

          <div className="row delivary">
            <div className="col-md-6">
              <Link to="/menu"><button type="button" class="btn delivarybtn btn-lg btn-block">DELIVERY</button></Link>
            </div>
            
            <div className="col-md-6">
              <button type="button" className="btn delivarybtn btn-lg btn-block">DINE-IN</button>
            </div>
          </div>
        </div>


        <div className="container">
          <div className="fuatuer_product_header text-warning">All Catagorey</div>
        <hr/>

          <div className="row">
            {catagorey.length != 0 && catagorey.map((data) => {
              return (
                <>
                <div className="col-md-4" style={{ marginBottom: '30px', padding: '10px' }}>
                  <Link to={`/sub_catagory/${data.id}`}>
                    <div className="card">
                      <img src={"http://screete.bikretabd.com/catagory/"+ data.catagory_img} />
                      <div className="product_name">{data.name}</div>
                    </div>
                  </Link>
                </div>
                </>
              )
            })}


          </div>

        </div>
      </div>
      <Fooder />
    </>
  );
}

export default Home;
