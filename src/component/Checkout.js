import '../App.css';
import Header from './Header';
import React, { useState, useEffect } from 'react';
import Fooder from './Fooder';
import Menubar from './Menubar';
import { useForm } from 'react-hook-form';
import Quckcheckoutform from './Quckcheckoutform';
import Userinfo from './Userinfo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Checkout() {
  const { register, handleSubmit } = useForm();

  const [totalprice, setTotalprice] = useState("");
  const [shipshow, setShipshow] = useState(false);
  const [quickcheckout, setQuickcheckout] = useState(false);
  const [checkoutproductlist, setCheckoutproductlist] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const [loading, setLoading] = useState(false);





  useEffect(() => {
    setInterval(function () {
      try {
        var addtocart = JSON.parse(localStorage.getItem("addtocart") || "[]");
        setCheckoutproductlist(addtocart);
        const cropt = addtocart.map((data) => data.price * data.qunt);
        const total = cropt.reduce((a, b) => a + b);
        setTotalprice(total);
      } catch (err) {
      }
    }, 100);
  }, [])



  useEffect(() => {
    setInterval(function () {
      try {
        const token = localStorage.getItem("token")
        setUserinfo(token);
      } catch (err) {
      }
    }, 100);
  }, [])








  const onSubmit = (data) => {
    setLoading(true)
    var auth = data;
    fetch('/userValidate', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Key': 'aHR0cHN+Y3VycnltZWFsLmFlfmFwaQ',
        'X-Auth-Email': 'info@currymeal.ae'
      },
      body: JSON.stringify(auth),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.content.token);
        localStorage.setItem("token", JSON.stringify(data.content.token))
        setLoading(false)
        toast("Login Successfully");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }




  const userauthincate = () => {
    return (
      <>
        {quickcheckout ?
          <div className="title text-warning" style={{ cursor: 'pointer' }} onClick={() => setQuickcheckout(!quickcheckout)}>Authinticate User-</div>
          :
          <div className="title text-warning" style={{ cursor: 'pointer' }} onClick={() => setQuickcheckout(!quickcheckout)}>Quick Check Out</div>
        }
        {quickcheckout ? ship() :
          <div className="p-3 bg-light">
            <div className="title text-info">User Login</div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="form-group">
                <label for="inputAddress"></label>
                <input type="text" {...register('username')} class="form-control"
                  id="username" placeholder="User Name" />
              </div>
              <div class="form-group">
                <label for="inputAddress"></label>
                <input type="test" {...register('password')}
                  class="form-control" id="password" placeholder="Password" /> <br />
                <input type="submit" class="form-control bg-success text-light" value="Login" />
              </div>
            </form>

            <br />
          </div>
        }
      </>
    )
  }


  const ship = () => {
    return (
      <>
        <Quckcheckoutform />
      </>
    )
  }

  const pickup = () => {
    return (
      <>
        <div className="title">Pickup locations</div>
        <ul class="list-group" style={{ marginTop: '20px' }}>
          <li class="list-group-item ship">
            <div class="form-check">
              Gyayathi<br />
              <span style={{ fontSize: '13px' }}>Ghayathi, Next to Tamm center, Abu Dhabi AZ</span>
            </div>
          </li>
        </ul>
      </>
    )
  }

  return (
    <>
      <div className="container"><Header /></div>
      <Menubar />


      <div className="container" style={{ marginTop: '20px' }}>
        <div className="row">

          {userinfo ? <Userinfo /> :
            <div className="col-md-6" style={{ backgroundColor: 'rgb(236 235 239 / 74%)', paddingTop: '20px', paddingBottom: '20px' }}>
              <div className="title">Delivery method</div>
              <ul class="list-group" style={{ marginTop: '20px' }}>
                <li class="list-group-item ship">
                  <div class="form-check">
                    <label class="form-check-label ship" style={{ color: shipshow ? 'black' : '#ff9900f0' }} for="flexRadioDefault1" onClick={() => setShipshow(false)}>
                      Ship
                    </label>
                  </div>
                </li>
                <li class="list-group-item pickup">
                  <div class="form-check">
                    <label class="form-check-label pickup" style={{ color: shipshow ? '#ff9900f0' : 'black' }} for="flexRadioDefault2" onClick={() => setShipshow(true)}>
                      Pick Up
                    </label>
                  </div>
                </li>
              </ul>
              <br />

              {shipshow ? pickup() : userauthincate()}
            </div>
          }

          <div className="col-md-6" style={{ backgroundColor: 'rgb(249 246 246)', padding: '10px' }}>
            <br />
            <table class="table py-3">
              <tr>
                <td style={{ width: '40%', padding: '15px', lineHeight: '40px' }}>
                  Subtotal <br />
                  {shipshow ? "Pick Up a" : "Shipping"}
                </td>
                <td style={{ textAlign: 'right', lineHeight: '40px' }}>
                  Taka {totalprice}
                  <br />
                  {shipshow ? <div style={{ fontSize: '13px' }}>Free</div> : <div style={{ fontSize: '13px' }}>Calculated at next step</div>}
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td style={{ textAlign: 'right' }}><h4>Taka {totalprice}</h4></td>
              </tr>
            </table>
          </div>
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

      {loading ?
        <div className="login_loading">
          <div className="loader"></div>
        </div>
        : ''}

      <Fooder />
    </>
  );
}

export default Checkout;
