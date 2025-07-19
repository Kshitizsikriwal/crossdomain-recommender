import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // make sure this path is correct

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
