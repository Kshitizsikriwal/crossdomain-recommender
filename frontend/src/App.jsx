import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // make sure this path is correct
import Dashboard from './components/Dashboard'; // make sure this path is correct
import Login from './components/Login';
import Register from './components/register';

function App() {
  localStorage.setItem('username', 'Kshitiz');
  localStorage.setItem('profilePic', 'https://your-custom-image.com/kshitiz.jpg');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
