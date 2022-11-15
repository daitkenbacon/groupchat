import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router';
import HomePage from './routes/Home/home-page';
import LoginPage from './routes/Login/login-page';
import SignUpPage from './routes/Signup/signup-page';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignUpPage/>}/>
    </Routes>
  );
}

export default App;
