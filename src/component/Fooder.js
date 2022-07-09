import '../App.css';
import 'aos';
import AOS from 'aos';



function Fooder() {




  return (
    <>
      <div className="main-fooder">
        <div className="container">
          <div className="fooder_aboutmenu">
            <div className="">ABOUT KFC</div>
            <div className="">FEEDBACK</div>
            <div className="">CANTACT US</div>
            <div className="">BRAND I & C</div>
            <div className="">FAC</div>
            <div className="">OFFERS T & C</div>
            <div className="">FIND A KFC</div>
          </div>

          <div className="row fooder_so">
            <div className="col-md-4 fooder_social_img" style={{ marginTop: '10px' }}>
              <img src="../img/facebook.png" />
              <img src="../img/instagram.jpg" />
              <img src="../img/youtube.png" />
            </div>

            <div className="col-md-4" style={{ marginTop: '10px' }}>Developed By : </div>
            <div className="col-md-4" style={{ marginTop: '10px' }}>© Copyright 2021 KFC. All Rights Reserved.</div>
          </div>

          <div className="fooder_text">
            Food shown are for illustration purpose only. Actual product may differ from the images shown in this website.<br />
            The KFC name, logos, and related marks are trademarks of KFC, Inc.
          </div>


        </div>
      </div>
    </>
  );
}

export default Fooder;
