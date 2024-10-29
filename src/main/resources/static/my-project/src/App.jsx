import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/components/Home';
import LoginForm from './assets/components/LoginForm';
import RegisterForm from './assets/components/RegisterForm';
import Dashboard from './assets/components/Dashboard';
import Profile from './assets/components/Profile';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
