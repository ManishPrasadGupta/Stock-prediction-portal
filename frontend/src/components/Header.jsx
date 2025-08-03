import React, { useContext } from 'react'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Header = () => {

   const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
   const navigate = useNavigate();

   const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    navigate('/login'); 
    }


  return (
    <>
    <nav
      className="navbar"
      style={{ backgroundColor: 'var(--bs-primary-bg-subtle)' }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand">Stock Prediction Portal</Link>
          <div>
            {isLoggedIn ? (
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            ) : (
              <>
                <Button text="Login" className="btn-outline-info" url="/login" />
                <Button text="Register" className="btn-info" url="/register" />
              </>
            )}
          
          </div>
      </div>
</nav>
    </>
  )
}

export default Header