import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import './App.css';
import {getAllLists} from './api/lists'
import {getAllTasksOf} from './api/task'
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function App() {
  const styles= useStyles();
  const [lists, setLists] = useState()
  const [tasks, setTasks] = useState()


  const fetchApi = async() => {
    
    let lists = await getAllLists()
    setLists(lists)
    lists.forEach( async element => {

      let tasksApi = await  getAllTasksOf(element.name);
      const concatenated = !tasks ? tasksApi : tasks.concat(tasksApi);

      console.log('tareas desde la api:'+tasksApi);
      console.log('tareas desde el estado:'+tasks);
      console.log('tareas desde el concat:'+concatenated);

      setTasks(!tasks ? tasksApi : tasks.concat(tasksApi));
    });
    
  }
  useEffect( () =>{
    fetchApi()
  }, [])

  return (
    <div className="App">
      <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <TableBody>
      {!lists ? 'cargandooo...' :
      lists.map( ( list, index) => {
        return (
          <>
            <TableRow key={list.name}>
              <TableCell>{list.name}</TableCell>
              <TableCell>
                <Edit className={styles.iconos} onClick={()=>console.log(list)}/>
                &nbsp;&nbsp;&nbsp;
                <Delete  className={styles.iconos} onClick={()=>console.log(list)}/>
                </TableCell>
            </TableRow>             
         </>
        )
      })}
      <Button onClick={()=>console.log('asd')}>Insertar</Button>
      </TableBody>
      </TableContainer><br /><br /><br />
          
    </div>
  );
}

export default App;
