import React, { useEffect, useState } from 'react';
import './App.css';
import {getAllLists} from './api/lists'

function App() {

  const [lists, setLists] = useState()

  const fetchApi = async() => {
    
    let lists = await getAllLists()
    console.log(lists)
    setLists(lists)
  }
  useEffect( () =>{
    fetchApi()
  }, [])
  return (
    <div className="App">
      **** Inicio ****
      {!lists ? 'cargandooo...' :
      lists.map( ( list, index) => {
        return <li>{list.name}</li>
      })}
    </div>
  );
}

export default App;
