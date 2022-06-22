import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import VideogameForm from "./components/VideogameForm/VideogameForm.jsx";
import Detail from "./components/Detail/Detail.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" exact component={Home} />
          <Route path="/create" exact component={VideogameForm} />
          <Route path="/home/:id" exact component={Detail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
