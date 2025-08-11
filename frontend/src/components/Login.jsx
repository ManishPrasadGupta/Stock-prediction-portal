import axios from 'axios';
import {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const Login = () => {

  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();
     const [error, setError] = useState('');
     const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);

      const userdata = {
        username, password
      }
      console.log(userdata)

      try {
        const response = await axios.post('http://localhost:8000/api/v1/token/', userdata);
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        console.log('Login successful');
        setIsLoggedIn(true);
        navigate('/dashboard'); 
      } catch (error) {
        console.error('invalid credential')    
        setError('Invalid username or password');  
      } finally {
        setLoading(false);
      }

    }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
            <div className='col-md-6 '>
              <h3 className='text-light text-center'>Login to your account</h3>
              <form onSubmit={handleLogin}>
                <div className='mb-3'>
                  <input type="username" className='form-control' placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className='mb-3'>
                  <input type="password" className='form-control' placeholder='Enter password' value={password}  onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {error && <div className="text-danger mb-3">{error}</div>}
                {loading ? (
                    <button type="submit" className='btn btn-info d-block mx-auto' disabled >Logging in...</button>
                ): <button type="submit" className='btn btn-info d-block mx-auto'>Login</button>
                }
              </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login;