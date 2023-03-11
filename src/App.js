import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router";

// pages
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import CreateAveria from "./components/CreateAveria"
import SolicitudRepuesto from "./components/SolicitudRepuesto";
import RepuestoDetails from "./components/RepuestoDetails";
//Auth
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
// components
import Navbar from "./components/Navbar";
import IsPrivate from "./components/IsPrivate";
import AveriaDetails from "./components/AveriaDetails";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />


        <Route
          path="/home"
          element={
            <IsPrivate>
              <Home />
            </IsPrivate>
          }
        />
        <Route
          path="/create-averia"
          element={
            <IsPrivate>
              <CreateAveria />
            </IsPrivate>
          }
        />
        <Route
          path="/averia/:idAveria/details"
          element={
            <IsPrivate>
              <AveriaDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/create-repuesto"
          element={
            <IsPrivate>
              <SolicitudRepuesto />
            </IsPrivate>
          }
        />
        <Route
          path="/repuesto/:idRepuesto/details"
          element={
            <IsPrivate>
              <RepuestoDetails />
            </IsPrivate>
          }
        />

        {/* error FE routes */}
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
