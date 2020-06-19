import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navbar } from './Components/Navbar';
import { TodosPage } from './Pages/TodosPAge';
import { AboutPage } from './Pages/AboutPAge';
// import 

const App: React.FC = () => {

  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route component={TodosPage} path="/" exact />
            <Route component={AboutPage} path="/about" />
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
