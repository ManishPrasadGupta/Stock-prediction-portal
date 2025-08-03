import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <nav
      className="navbar"
      style={{ backgroundColor: 'var(--bs-primary-bg-subtle)' }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand">Stock Prediction Portal</Link>
          <div>
            <Button text="Login" className="btn-outline-info" url="/login" />
            <Button text="Register" className="btn-info" url="/register" />
          </div>
      </div>
</nav>
    </>
  )
}

export default Header