import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import User from './Components/User';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:name" element={<User />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
