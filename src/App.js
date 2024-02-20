import './App.css';
import {useState} from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch('https://api.github.com/repos/nudgenow/Nudge-Showcase-Android/dispatches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', 
          'Authorization': 'token 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', 
          'Accept':"application/vnd.github.everest-preview+json",
        },
        body: JSON.stringify({
          event_type: 'prod_deploy',
          client_payload: { clientId: `nudge-`+inputValue }
        }),
      });
      // const data = await response.json();
      // setResponseData(data);
      setInputValue('');

      toast.success('Response Submitted Successfully. You will be notified by slack!', {
        autoClose: 3000
      });

    } catch (error) {
      setError(error);
    }
  
    setIsLoading(false);
  };
  

  return (
    <div className="App">
      {/* <ToastContainer style={{
        zIndex:"999"
      }}/> */}
      <form onSubmit={handleSubmit}
      className='formm'
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter ClientId"
          className='inputField'
          required
          
        />
        <button type="submit" disabled={isLoading} className='submitButton'>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default App;
