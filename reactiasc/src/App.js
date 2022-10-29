import React, { useEffect } from 'react';
import './App.css';
import {getAllLists} from './api/lists'

function App() {
  const url = 'http://localhost:4000/lists'
  const fetchApi = async() => {
    
    const response = getAllLists()
    console.log(response)
  }
  useEffect( () =>{
    fetchApi()
  }, [])
  return (
    <div className="App">
      **** {url} ****
    </div>
  );
}

export default App;
