import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './component/Home';
import Subcatagory from './component/Subcatagory';
import Items from './component/Items';


function App() {
  return (
    <>    
      <BrowserRouter>
        <Switch>
        <Route path="/"  exact component={Home}/>
          <Route path="/sub_catagory/:id" component={Subcatagory}/>
          <Route path="/products/:id" component={Items}/>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;

