import '../App.css';
import Fooder from './Fooder';
import Menubar from './Menubar';
import Navber from './Navber';
import 'aos';
import AOS from 'aos';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import env from "react-dotenv";



function Menu({ match }) {
  const [productcard, setProductcard] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 })
  });

  var a = 1;
  const addtocardmethod = (e) => {
    console.log("image:", e.id)
    console.log("image:", e.thumbnail_image)
    console.log("name:", e.name)
    console.log("id:", e.id)
    console.log("price", e.price_stock_chart[0].s_p)

    var addtocart = JSON.parse(localStorage.getItem("addtocart") || "[]");

    if (addtocart.length === 0) {
      var addtocart = JSON.parse(localStorage.getItem("addtocart") || "[]");
      addtocart.push({ id: e.id, img: e.thumbnail_image, product_name: e.name, price: e.price_stock_chart[0].s_p, qunt: 1 });
      localStorage.setItem("addtocart", JSON.stringify(addtocart));
    } else {
      var mach = addtocart.filter((dt) => {
        return dt.product_name.match(e.name)
      })
      if (mach.length === 0) {
        var addtocart = JSON.parse(localStorage.getItem("addtocart") || "[]");
        addtocart.push({ id: e.id, img: e.thumbnail_image, product_name: e.name, price: e.price_stock_chart[0].s_p, qunt: 1 });
        localStorage.setItem("addtocart", JSON.stringify(addtocart));
        toast("New Product Add to Cart")
      } else {
        var addtocart = JSON.parse(localStorage.getItem("addtocart") || "[]");
        var index = addtocart.findIndex(x => x.product_name === e.name);
        addtocart[index].qunt = addtocart[index].qunt + 1;
        localStorage.setItem("addtocart", JSON.stringify(addtocart));
        toast("Update Product Add to Cart")
      }
    }
  }

  // console.log(match.params.id)

  
    const datashowing = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: match.params.id })        
    };
    fetch(env.base_url + '/admin/sub_cata_sub_id_client', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data.sub_id);
            setProductcard(data.sub_id)
          });
  }
 
 useEffect(() => {    
    console.log(match.params.id);
    datashowing();   
  },[]);

 




  return (
    <>
      <Navber /><br/>      
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

      <div className="product_header text-warning">All Subcatagory</div>
      <hr/>

      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">

          {productcard.map((productcartdata) => {
            return (
              <>
              <div className="col text-light" data-aos="zoom-in">              
                <div className="card" key="unique" style={{backgroundColor:"#586e8d"}}>
                  <img src={"http://localhost:4000/subcatagory/"+productcartdata.sub_catagory_img} class="card-img-top" data-aos="flip-right" alt="..." style={{ height: '287px', width: '92%', height: '287px', margin: '0 auto', marginTop: '10px' }} />
                  <div className="card-body">
                    <h6 className="card-title">{productcartdata.name}</h6>                    
                  </div>
                </div>
              </div>
              </>
            )
          })
        }
        </div>
      </div>


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



    </div>
      <Fooder />
    </>
  );
}

export default Menu;
