import './App.css'
import { Routes } from 'react-router';
import { BrowserRouter } from "react-router";
import { Route } from 'react-router';
import Home from './pages/home';
import ErrorPage from './pages/errorPage';
import Form from './pages/form';
import Success from './pages/success';
import { Toaster } from './components/retroui/Sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {


  const query = new QueryClient()

  return (
    <div>
      <QueryClientProvider client={query}>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/form' element={<Form />} />
            <Route path='/profile' element={<Success />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />

      </QueryClientProvider>
    </div>
  )
}

export default App
