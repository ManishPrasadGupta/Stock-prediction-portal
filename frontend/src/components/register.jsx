import React from 'react'
import axios from 'axios';

const Register = () => {

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userdata = {
      username, email, password
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/register/', userdata);
     
      console.log(response.data);
      console.log('Registration successful');
      setError(''); 
      setSuccess(true);
    } catch (error) {
      setError(error.response.data)
      console.error('Error during registration:', error.response.data);
    }finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container">
      <div className="row justify-content-center">
        <div className='col-md-6 '>
          <h3 className='text-light text-center'>Create your account</h3>
          <form onSubmit={handleRegistration}>
          <div className='mb-3'>
            <input type="username" className='form-control' placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <small>{
              error.username && <div className="text-danger">{error.username}</div>
              }
            </small>
          </div>
          
          <div className='mb-3'>
            <input type="email" className='form-control' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}/>
             <small>{
              error.email && <div className="text-danger">{error.email}</div>
              }
            </small>
          </div>
          
          <div className='mb-3'>
            <input type="password" className='form-control' placeholder='Enter password' value={password}  onChange={(e) => setPassword(e.target.value)}/>
            <small>{
              error.password && <div className="text-danger">{error.password}</div>
              }
            </small>
          </div>
          {success && 
            <div className="alert alert-success">
              Registration successful!
            </div>
          }

          {loading ? (
              <button type="submit" className='btn btn-info d-block mx-auto' disabled >Please wait</button>
          ): <button type="submit" className='btn btn-info d-block mx-auto'>Register</button>
          }
          
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register;

