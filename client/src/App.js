import {
  BrowserRouter as Router
} from "react-router-dom";
import './App.scss';
import GuestRoute from "./components/routes/Guest";
import AuthRoute from "./components/routes/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CreateBidItem from "./components/CreateBidItem";

function App() {
  return (
    <Router>
        <GuestRoute path="/login" component={Login}/>
        <GuestRoute path="/register" component={Register}/>
        <AuthRoute path="/createBidItem" exact component={CreateBidItem}/>
        <AuthRoute path="/" exact component={Dashboard}/>
    </Router>
  );
}

export default App;
