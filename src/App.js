import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './component/Home';
import Menu from './component/Menu';
import Items from './component/Items';

import Shopingcard from './component/Shopingcard';
import Checkout from './component/Checkout';

function App() {
  return (
    <>    
      <BrowserRouter>
        <Switch>
        <Route path="/"  exact component={Home}/>
          <Route path="/sub_catagory/:id" component={Menu}/>
          <Route path="/products/:id" component={Items}/>
          <Route path="/addtocart" component={Shopingcard}/>
          <Route path="/product_checkout" component={Checkout}/>
          
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

