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
  const [locata, setLocata] = useState([]);
  const [productcount, setProductcount] = useState(5);



  useEffect(() => {
    AOS.init({ duration: 1000 })
  });


  useEffect(() => {



    setInterval(function () {
      var item = JSON.parse(localStorage.getItem("item") || "[]");
      setLocata(item);
    }, 100);





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





  const addtocards = (e) => {

    var id = e.id;
    var item_name = e.item_name;
    var api_photo = e.fontimg;
    var price = e.regular_price;

    var a = 1;
    var item = JSON.parse(localStorage.getItem("item") || "[]");

    if (item.length === 0) {
      var item = JSON.parse(localStorage.getItem("item") || "[]");
      item.push({ id: id, item_name: item_name, api_photo: api_photo, qnt: a, price: price });
      localStorage.setItem("item", JSON.stringify(item));
    } else {
      var mach = item.filter((dt) => {
        return dt.item_name.match(item_name)
      })
      if (mach.length === 0) {
        var item = JSON.parse(localStorage.getItem("item") || "[]");
        item.push({ id: id, item_name: item_name, api_photo: api_photo, qnt: a, price: price });
        localStorage.setItem("item", JSON.stringify(item));
      } else {
        var item = JSON.parse(localStorage.getItem("item") || "[]");
        var index = item.findIndex(x => x.item_name === item_name);
        if (item[index].qnt != 10) {
          item[index].qnt = item[index].qnt + 1;
          localStorage.setItem("item", JSON.stringify(item));
        }
      }
    }
  }




  const increment = (e) => {
    console.log(e);

    var item = JSON.parse(localStorage.getItem("item") || "[]");
    var index = item.findIndex(x => x.id === e);
    if (item[index].qnt != 10) {
      item[index].qnt = item[index].qnt + 1;
      localStorage.setItem("item", JSON.stringify(item));
    }
  }


  const derement = (e) => {
    var item = JSON.parse(localStorage.getItem("item") || "[]");
    var index = item.findIndex(x => x.id === e);
    if (item[index].qnt > 1) {
      item[index].qnt = item[index].qnt - 1;
      localStorage.setItem("item", JSON.stringify(item));
    } else {
      const item = JSON.parse(localStorage.getItem("item"));
      var index = item.findIndex(x => x.id === e);
      item.splice(index, 1);
      localStorage.setItem('item', JSON.stringify(item));
    }
  }





  return (
    <>
      <Navber /><br />

      <div className="container">

        <div className="row">
          {product_data.map((data, index) => {
            return (
              <>
                <div className="col-md-3 main_items" data-aos="zoom-in" key="{data}">
                  <div className="card" key="unique" style={{ backgroundColor: "#586e8d" }}>
                    <img src={"http://screete.bikretabd.com/items_image_file/" + data.fontimg} class="card-img-top" data-aos="flip-right" alt="..." style={{ height: '287px', width: '92%', height: '287px', margin: '0 auto', marginTop: '10px' }} />
                    <div className="card-body text-light" onClick={() => addtocards(data)} style={{ cursor: 'pointer' }}>
                      <h6 className="card-title">{data.item_name}</h6>
                      <h6 className="card-title">Price : Tk {data.regular_price} </h6>
                    </div>
                  </div>

                  {locata.map((local, i) => {
                    return (
                      <>
                        <div className='adding_card' key="{local}">
                          {
                            local.id === data.id ?
                              <div style={{ marginTop: '50%', paddingLeft: '25%' }}>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                  <button type="button" class="btn btn-dark" onClick={() => derement(local.id)}>-</button>
                                  <button type="button" class="btn text-light">{local.qnt}</button>
                                  <button type="button" class="btn btn-dark" onClick={() => increment(local.id)}>+</button>
                                </div>
                              </div>
                              : ""
                          }
                        </div>
                      </>
                    )
                  })
                  }
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
