import "rsuite/dist/styles/rsuite-default.css";
import "./styles/main.css";
import { Switch } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";

//Pages
import SignIn from "./pages/SignIn";
import Home from "./pages/Home/Home";

// components
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
          <SignIn />
        </PublicRoute>

        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
