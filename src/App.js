import "rsuite/dist/styles/rsuite-default.css";
import "./styles/main.css";
import { Switch, Route } from "react-router-dom";

//Pages
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

// components
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Switch>
      <PublicRoute path="/signin">
        <SignIn />
      </PublicRoute>

      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
