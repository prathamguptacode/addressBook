import './App.css'
import { Routes } from 'react-router';
import { BrowserRouter } from "react-router";
import { Route } from 'react-router';
import Home from './pages/home';
import ErrorPage from './pages/errorPage';
import Form from './pages/form';
import Success from './pages/success';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/callback' element={<Form />} />
        <Route path='/profile' element={<Success />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
