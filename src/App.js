import React from 'react';
import { Routes, Route } from "react-router-dom";
import Panel from './pages/Panel';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import ResetPass from './pages/ResetPass';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Reports from './pages/Reports';
import Support from './pages/Support';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/panel" element={<Panel />} >
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reports" element={<Reports />} />
          <Route path="support" element={<Support />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPass" element={<ResetPass />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
