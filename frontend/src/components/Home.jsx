import Button from './Button'

const Home = () => {
  return (
    <div className='container'>
      <div className='p-5 text-center bg-light-dark rounded'>
        <h1 className='text-light'>Welcome to the Prediction App</h1>
        <p className='lead text-light'>Your one-stop solution for all predictions</p>
        <Button text='Explore Now' class='btn-info' />

      </div>
    </div>
  )
}

export default Home;