import React from 'react';
import Favorites from '../Favorites/Favorites';
import Home from '../Home/Home';

function App(props) {
  return (
    <div>
      <h1>Giphy Search!</h1>
      <Home/>
      <Favorites/>
    </div>
  );
}

export default App;
