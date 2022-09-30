import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import Dashboard from "./components/Dashboard";
import DetailUser from "./components/DetailUser";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <Dashboard />
            </>
          }
        />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/detail/:id" element={<DetailUser />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
