import React from 'react';  
import reactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.css';


reactDom.render(
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>,
    document.getElementById('root')
  );
