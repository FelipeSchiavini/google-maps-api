import "./App.css";
import Login from "./components/login/login";
import GoogleMapss from "./components/google/google-maps";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./components/register/register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/maps" element={<GoogleMapss />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
