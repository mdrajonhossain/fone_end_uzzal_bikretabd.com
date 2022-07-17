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


  useEffect(() => {
    AOS.init({ duration: 1000 })
  });


  useEffect(() => {

    setInterval(function () {
      var addcard = JSON.parse(localStorage.getItem("addcard_items") || "[]");
      setLocata(addcard);
    }, 100);


    locata.map((ss)=>{
      console.log(55, ss.item_name);
    })








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
    var addcard_items = JSON.parse(localStorage.getItem("addcard_items") || "[]");
    addcard_items.push({ item_id: e.id, item_name: e.item_name, price: e.regular_price, qnt: 1 });
    localStorage.setItem("addcard_items", JSON.stringify(addcard_items));
  }




  var a = 1;
  const increment = (e) => {
    var addcard_items = JSON.parse(localStorage.getItem("addcard_items") || "[]");

    if (addcard_items.length === 0) {
      var addcard_items = JSON.parse(localStorage.getItem("addcard_items") || "[]");
      addcard_items.push({ item_id: e.id, item_name: e.item_name, price: e.regular_price, qnt: 1 });
      localStorage.setItem("addcard_items", JSON.stringify(addcard_items));
    } else {
      var mach = addcard_items.filter((dt) => {
        return dt.item_name.match(e.item_name)
      })
      if (mach.length === 0) {
        var addcard_items = JSON.parse(localStorage.getItem("addcard_items") || "[]");
        addcard_items.push({ item_id: e.id, item_name: e.item_name, price: e.regular_price, qnt: 1 });
        localStorage.setItem("users", JSON.stringify(addcard_items));
      } else {
        var addcard_items = JSON.parse(localStorage.getItem("addcard_items") || "[]");
        var index = addcard_items.findIndex(x => x.item_name === e.item_name);
        addcard_items[index].qnt = addcard_items[index].qnt + 1;
        localStorage.setItem("addcard_items", JSON.stringify(addcard_items));
      }
    }
  }


  var a = 1;
  const derement = (e) => {
    var addcard_items = JSON.parse(localStorage.getItem("addcard_items") || "[]");

    if (addcard_items.length === 0) {
      var addcard_items = JSON.parse(localStorage.getItem("addcard_items") || "[]");
      addcard_items.push({ item_id: e.id, item_name: e.item_name, price: e.regular_price, qnt: 1 });
      localStorage.setItem("users", JSON.stringify(addcard_items));
    } else {
      var mach = addcard_items.filter((dt) => {
        return dt.item_name.match(e.item_name)
      })
      if (mach.length === 0) {
        var addcard_items = JSON.parse(localStorage.getItem("addcard_items") || "[]");
        addcard_items.push({ item_id: e.id, item_name: e.item_name, price: e.regular_price, qnt: 1 });
        localStorage.setItem("users", JSON.stringify(addcard_items));
      } else {
        var addcard_items = JSON.parse(localStorage.getItem("addcard_items") || "[]");
        var index = addcard_items.findIndex(x => x.item_name === e.item_name);
        addcard_items[index].qnt = addcard_items[index].qnt - 1;
        localStorage.setItem("addcard_items", JSON.stringify(addcard_items));
      }
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
                <div className="col-md-3 main_items" data-aos="zoom-in">
                  <div className="card" key="unique" style={{ backgroundColor: "#586e8d" }}>
                    <img src={"http://screete.bikretabd.com/items_image_file/" + data.fontimg} class="card-img-top" data-aos="flip-right" alt="..." style={{ height: '287px', width: '92%', height: '287px', margin: '0 auto', marginTop: '10px' }} />
                    <div className="card-body text-light">
                      <h6 className="card-title">{data.item_name}</h6>
                      <h6 className="card-title">Price : Tk {data.regular_price} </h6>
                    </div>
                  </div>
                  <div className='adding_card'>

                    {
                      locata.length != 0 ?
                        locata.map((local_data) => {
                          return (
                            <>
                              {local_data.item_id === data.id ?
                                <div style={{ marginTop: '50%', paddingLeft: '25%' }}>
                                  <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-dark" onClick={() => derement(data)}>-</button>
                                    <button type="button" class="btn text-light">10</button>
                                    <button type="button" class="btn btn-dark" onClick={() => increment(data)}>+</button>
                                  </div>
                                </div>
                                :
                                <div onClick={() => addtocards(data)} style={{ background: '#006a50', cursor: 'pointer', marginTop: '50%', color: 'white', padding: '15px', textAlign: 'center' }}>
                                  Add to Card</div>
                              }
                            </>
                          )
                        })
                        :
                        <div onClick={() => addtocards(data)} style={{ background: '#006a50', cursor: 'pointer', marginTop: '50%', color: 'white', padding: '15px', textAlign: 'center' }}>
                          Add to Card</div>
                    }


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
