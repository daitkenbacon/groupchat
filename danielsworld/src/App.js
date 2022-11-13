import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router';
import HomePage from './routes/Home/home-page';

function App() {
  return (
    <Routes>
      <Route path='/t' element={<HomePage/>}/>
    </Routes>
  );
}

export default App;
