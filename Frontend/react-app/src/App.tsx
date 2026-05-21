import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Reviews from './pages/Reviews';
import OrderPage from './pages/OrderPage';
import Account from './pages/Account';
import EmployeeLayout from './pages/employee/EmployeeLayout';
import Dashboard from './pages/employee/Dashboard';
import Orders from './pages/employee/Orders';
import OrderDetail from './pages/employee/OrderDetail';
import Clients from './pages/employee/Clients';
import './App.css';

function PublicLayout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<PublicLayout />} />
      <Route path="/employee" element={<EmployeeLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetail />} />
        <Route path="clients" element={<Clients />} />
      </Route>
    </Routes>
  );
}
