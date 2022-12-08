import React from 'react';
import Favorites from '../Favorites/Favorites';
import Home from '../Home/Home';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

function App(props) {
  return (
    
    <div className='app'>
      <h1>Giphy Search!</h1>
      <Router>
        <nav>
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/Favorites">Favorites</Link>
            </div>
        </nav>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/Favorites">
          <Favorites/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
