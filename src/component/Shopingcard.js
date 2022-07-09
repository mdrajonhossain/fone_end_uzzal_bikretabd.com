import '../App.css';
import Header from './Header';
import React, { useState, useEffect } from 'react';
import Fooder from './Fooder';
import Menubar from './Menubar';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Shopingcard() {
  // const ref = React.useRef();
  const [addtocartdata, setAddtocartdata] = useState([]);
  const [producttotal, setProducttotal] = useState("");

  const productdelte = (e) => {
    const addtocart = JSON.parse(localStorage.getItem("addtocart"));
    addtocart.splice(e, 1);
    localStorage.setItem('addtocart', JSON.stringify(addtocart));
    toast("Item Remove")
  }


  useEffect(() => {
    setInterval(function () {
      var addtocart = JSON.parse(localStorage.getItem("addtocart") || "[]");
      setAddtocartdata(addtocart)
    }, 100);
  }, [setInterval])


  useEffect(() => {
    setInterval(function () {
      try {
        var addtocart = JSON.parse(localStorage.getItem("addtocart") || "[]");
        const cropt = addtocart.map((data) => data.price * data.qunt)
        const total = cropt.reduce((a, b) => a + b);
        setProducttotal(total)
      } catch (err) {
      }
    }, 100);
  }, [setInterval])




  useEffect(() => {
    fetch('/productCategories', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Key': 'aHR0cHN+Y3VycnltZWFsLmFlfmFwaQ',
        'X-Auth-Email': 'info@currymeal.ae'
      },
      body: {},
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.content);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const increment = (e) => {
    var addtocart = JSON.parse(localStorage.getItem("addtocart") || "[]");
    var index = addtocart.findIndex(x => x.product_name === e.product_name);
    addtocart[index].qunt = addtocart[index].qunt + 1;
    localStorage.setItem("addtocart", JSON.stringify(addtocart));
  }

  const decrment = (e) => {
    var addtocart = JSON.parse(localStorage.getItem("addtocart") || "[]");
    var index = addtocart.findIndex(x => x.product_name === e.product_name);
    if (addtocart[index].qunt == 1) {
    } else {
      addtocart[index].qunt = addtocart[index].qunt - 1;
      localStorage.setItem("addtocart", JSON.stringify(addtocart));
    }
  }

  const continueback = () => {
    window.history.back();
  }


  return (
    <>
      <div className="container"><Header /></div>
      <Menubar />


      <div className="container text-center text-info" style={{ fontSize: '18px', marginTop: '20px', cursor: 'pointer' }} onClick={continueback}>Continue Shopping</div>

      <div className="container" style={{ marginTop: "10px" }}>
        <table class="table" style={{background:'#edead6', color:'#742f81'}}>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col"></th>
              <th scope="col">Price</th>
              <th scope="col">Qnt</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>

            {addtocartdata.map((data, index) => {
              return (
                <tr>
                  <td><img src={data.img} width="60px" height="40px" /></td>
                  <td>
                    {data.product_name}<br />
                    <div className="text-danger" onClick={() => productdelte(index)} style={{ cursor: 'pointer' }}>Remove</div>
                  </td>
                  <td>৳{data.price}</td>
                  <td>
                    <div class="btn-group mr-2" role="group" aria-label="Second group">
                      <button type="button" class="btn btn-secondary" onClick={() => decrment(data)}>-</button>
                      <button type="button" class="btn btn-light">{data.qunt}</button>
                      <button type="button" class="btn btn-secondary" onClick={() => increment(data)}>+</button>
                    </div>

                  </td>
                  <td style={{ textDecoration: 'none' }}>৳{data.qunt * data.price}</td>
                </tr>
              )
            })}
          </tbody>
          <tr>
            <td colspan="5" style={{ textAlign: 'right', color: '#582352', padding:'10px', fontWeight: 'bold' }}>Subtotal ৳{producttotal} </td>
          </tr>
        </table>
        <Link to="/product_checkout" style={{ textDecoration: 'none' }}><div className="container checkout">CHECK OUT</div></Link>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Fooder />
    </>
  );
}

export default Shopingcard;
