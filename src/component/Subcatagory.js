import '../App.css';
import Fooder from './Fooder';
import Navber from './Navber';
import 'aos';
import AOS from 'aos';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import env from "react-dotenv";
import { Link } from "react-router-dom";


function Subcatagory({ match }) {
  const [productcard, setProductcard] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 })
  });




  useEffect(() => {

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: match.params.id })
      };
      fetch('http://screete.bikretabd.com/admin/sub_cata_sub_id_client', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data.sub_id);
          setProductcard(data.sub_id)
        });
    }
    catch (err) {
      console.log(err);
    }
  }, []);






  return (
    <>
      <Navber /><br />
      <div className="container">
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

        <div className="product_header text-warning">
          {productcard.length === 0 ? <div className="empty_data">Data Empty</div> : "All Subcatagory"}
        </div>

        {productcard.length === 0 ? "" : <hr />}



        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 g-4">

            {productcard.map((productcartdata) => {
              return (
                <>
                  <div className="col text-light" data-aos="zoom-in">
                    <Link to={`/products/${productcartdata.category_id}`}>
                      <div className="card" key="unique" style={{ backgroundColor: "#586e8d" }}>
                        <img src={"http://screete.bikretabd.com/subcatagory/" + productcartdata.sub_catagory_img} class="card-img-top" data-aos="flip-right" alt="..." style={{ height: '287px', width: '92%', height: '287px', margin: '0 auto', marginTop: '10px' }} />
                        <div className="card-body text-light">
                          <span className="card-title">{productcartdata.name}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              )
            })
            }
          </div>
        </div>





      </div>
      <Fooder />
    </>
  );
}

export default Subcatagory;
