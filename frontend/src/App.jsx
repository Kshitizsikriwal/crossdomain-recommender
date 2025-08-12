import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'; // make sure this path is correct
import Dashboard from './components/Dashboard'; // make sure this path is correct
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import WeeklyPlan from "./components/WeeklyPlan";



function App() {
  localStorage.setItem('profilePic', 'https://your-custom-image.com/kshitiz.jpg');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
        <Route path='/login' element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path='/home' element={<Home />}/>
        <Route path="/weekly-plan" element={<WeeklyPlan />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
