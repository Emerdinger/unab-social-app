import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import "./app.css"
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import RecoverPassword from "./pages/recover/recoverPassword";


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/recover" element={<RecoverPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />}/>
        <Route exact path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
