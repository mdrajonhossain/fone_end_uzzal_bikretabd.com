import '../App.css';
import Navber from './Navber';
import React, { useState, useEffect } from 'react';
import Fooder from './Fooder';
import 'aos';
import AOS from 'aos';
import { Link } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";




function Items({ match }) {
  const [product_data, setProduct_data] = useState([]);


  useEffect(() => {
    AOS.init({ duration: 1000 })
  });


  useEffect(() => {

    var id = match.params.id;
    try {

      const requestOptionsitem = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
      };
      fetch('http://screete.bikretabd.com/admin/item_client', requestOptionsitem)
        .then(response => response.json())
        .then(data => {
          console.log(11, data.items);
          setProduct_data(data.items);
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

        <div className="row">
          {product_data.map((data) => {
            return (
              <>
                <div className="col-md-4 main_items" data-aos="zoom-in">
                  <div className="card" key="unique" style={{ backgroundColor: "#586e8d" }}>
                    <img src={"http://screete.bikretabd.com/items_image_file/" + data.fontimg} class="card-img-top" data-aos="flip-right" alt="..." style={{ height: '287px', width: '92%', height: '287px', margin: '0 auto', marginTop: '10px' }} />
                    <div className="card-body text-light">
                      <h6 className="card-title">{data.item_name}</h6>
                      <h6 className="card-title">Price : Tk {data.regular_price} </h6>
                    </div>
                  </div>
                  <div className='adding_card'>
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <button type="button" class="btn btn-dark">-</button>
                      <button type="button" class="btn text-light">10</button>
                      <button type="button" class="btn btn-dark">+</button>
                    </div>
                  </div>
                </div> &nbsp;

              </>
            )
          })}

        </div>




      </div>

      <Fooder />
    </>
  );
}

export default Items;
