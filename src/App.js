import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Nova site da ISS Comercio
        </p>
        <a
          className="App-link"
          href="https://www.isscomercio.com.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Antigo site
        </a>
      </header>
    </div >
  );
}

export default App;
