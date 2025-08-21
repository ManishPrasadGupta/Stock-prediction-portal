
import { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance';

const Dashboard = () => {

    const [ticker, setTicker] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [plot, setPlot] = useState();
    const [plot100Dma, setPlot100Dma] = useState();
    const [plot200Dma, setPlot200Dma] = useState();
    const [plotFinalPredictions, setPlotFinalPredictions] = useState();
    const [mse, setMse] = useState();
    const [rmse, setRmse] = useState();
    const [r2, setR2] = useState();

    const accessToken = localStorage.getItem('access_token');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const response = await axiosInstance.post('/predict/', {
          ticker: ticker
        });
        console.log(response.data)
        const backendRoot = import.meta.env.VITE_BACKEND_ROOT
        const plotUrl = `${backendRoot}${response.data.plot_img}`;
        const ma100Url = `${backendRoot}${response.data.plot_100_dma}`;
        const ma200Url = `${backendRoot}${response.data.plot_200_dma}`;
        const finalPredictionsUrl = `${backendRoot}${response.data.plot_final_predictions}`;


        setPlot(plotUrl);
        setPlot100Dma(ma100Url);
        setPlot200Dma(ma200Url);
        setPlotFinalPredictions(finalPredictionsUrl);
        setMse(response.data.mse);
        setRmse(response.data.rmse);
        setR2(response.data.r2);

        // set plot
        if(response.data.error) {
          setError(response.data.error);
        }
      } catch (error) {
        console.error('Error while making the API request:', error);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response  = await axiosInstance.get('/protected-view/')
            } catch (error) {  
                console.error('Error fetching data:', error)
            }
        }
        fetchProtectedData();
    }, []);

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 mx-auto '>
          <form onSubmit={handleSubmit}>
          <input type="text" className='form-control mx-auto' placeholder='Enter Stock Ticker'
            onChange={(e) => setTicker(e.target.value)}
            required
          />
          <small>{error && <div className='text-danger'>{error}</div>}</small>
          <button type='submit' className='btn btn-info mt-3'>
            {loading ? 'Loading...' : 'See Prediction'}
          </button>
        </form>
        </div>

        {/* print prediction plots */}
        {plotFinalPredictions && (
          <div className='prediction mt-5'>
          <div className='p-5'>
            {plot && (
              <img src={plot} style={{maxWidth: '100%'}} />
            )}
          </div>

          <div className='p-5'>
            {plot100Dma && (
              <img src={plot100Dma} style={{maxWidth: '100%'}} />
            )}
          </div>

          <div className='p-5'>
            {plot200Dma && (
              <img src={plot200Dma} style={{maxWidth: '100%'}} />
            )}
          </div>

          <div className='test-light p-5'>
            {plotFinalPredictions && (
              <img src={plotFinalPredictions} style={{maxWidth: '100%'}} />
            )}
          </div>

          <div className='test-light p-3'>
            <h1>Mean Evaluation</h1>
            {mse && (
              <div>
                <h5>Mean Squared Error (MSE): {mse}</h5>
              </div>
            )}
          </div>

          <div className=' test-light p-3'>
            {rmse && (
              <div>
                <h5>Root Mean Squared Error (RMSE): {rmse}</h5>
              </div>
            )}
          </div>

          <div className=' test-light p-3'>
            {r2 && (
              <div>
                <h5>R-Squared (R2): {r2}</h5>
              </div>
            )}
          </div>
        </div>
        )}
        
      </div>
    </div>
  )
}

export default Dashboard;