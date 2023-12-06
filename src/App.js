import React from 'react';
import './App.css';
import RateCurrency from '../src/component/RateCurrency/RateCurrency';

const App = () => {
  return (
    <div className="app-container">
      <div className="header">
        <h1>Rate Currency App</h1>
        <h4>Rates are based from 1 USD</h4>
      </div>
      <div className="content">
        <RateCurrency />
      </div>
      <div className="footer">
        <h4>This application uses API from <a rel='noreferrer' target={"_blank"} href="https://currencyfreaks.com">Currency Freaks</a></h4>
      </div>
    </div>
  )
}

export default App;