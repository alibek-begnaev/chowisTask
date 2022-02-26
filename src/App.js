import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import "./utils/axios";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route
          path="/"
          component={() =>
            !!window.localStorage.getItem("token") ? (
              <HomePage />
            ) : (
              <Redirect to="/login"></Redirect>
            )
          }
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
//NOT Enough Time To Finish
