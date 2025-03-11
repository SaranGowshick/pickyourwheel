import React from 'react';
import Read from './components/read';
import Create from './components/create';
import Update from './components/update';
import { PickerWheel } from './components/pickerWheel';

import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';

const api_base="http://localhost:3001";
function App() {
  

  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path='/' element={<PickerWheel/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/update/:id' element={<Update/>}/>
      </Routes> 
    </Router>        
        
    </div>
  );
}

export default App;
