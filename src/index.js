import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

var xhttp = new XMLHttpRequest();
var data = {};
xhttp.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    var response = xhttp.responseText;
    data = JSON.parse(response);
    ReactDOM.render(
        <Router>
            <App livebus={data}/>
        </Router>,
        document.getElementById('root'));
  }
}
xhttp.open("GET", `https://www.bu.edu/bumobile/rpc/bus/livebus.json.php`, true);
xhttp.send()

// ReactDOM.render(
//     <Router>
//         <App />
//     </Router>,
//     document.getElementById('root'));
// registerServiceWorker();
