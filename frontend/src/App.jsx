import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/register'
import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import AuthProvider from './AuthProvider'
import Dashboard from './components/Dashboard'
import PrivateRoute from './privateRoute'
import PublicRoute from './publicRoute'


function App() {

  return (  
    <>
      <AuthProvider>
        <div className="bg-dark text-light min-vh-100">
        <BrowserRouter>
          <Header />  
            <Routes>  
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            </Routes>
          <Footer />
        </BrowserRouter>
        </div>
      </AuthProvider>
    </>
  )
}

export default App;
