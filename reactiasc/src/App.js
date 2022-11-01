import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import './App.css';
import { getAllLists, createList } from './api/lists'
import {getAllTasksOf, createTask} from './api/task'
import { TableContainer,  TableCell, TableBody, TableRow, Modal, Button, TextField, Checkbox} from '@material-ui/core';
import {Edit, Delete, Add} from '@material-ui/icons';


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
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalShowList, setMmdalShowList]=useState(false);
  const [listSelected, setlistSelected]=useState({name : ''});
  const [tasksOfListSelected, setTasksOfListSelected]=useState();
  const [tasksToAdd, setTasksToAdd]=useState();

  const onClickAdd = async()=>{
    let newListsOfTasks = tasksOfListSelected.concat(tasksToAdd);
    setTasksOfListSelected(newListsOfTasks);
    showModalViewList();
    await createTask(listSelected, tasksToAdd);
  }

  const editList =async(list)=>{
    setlistSelected(list);
    setTasksOfListSelected(await getAllTasksOf(list.name))
    showModalViewList()
  }

  const postList=async()=>{
    let newLists = lists.concat(listSelected);
    setLists(newLists);
    abrirCerrarModalInsertar();
    await createList(listSelected);
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setlistSelected({ [name] : value});
  }
  const handleChangeTask=e=>{
    const {name, value}=e.target;
    setTasksToAdd({ [name] : value});
  }
  
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }
  const showModalViewList=()=>{
    setMmdalShowList(!modalShowList);
  }
  const fetchApi = async() => {
    
    let lists = await getAllLists()
    setLists(lists)
    lists.forEach( async element => {

      let tasksApi = await getAllTasksOf(element.name);
      //const concatenated = !tasks ? tasksApi : tasks.concat(tasksApi);
      setTasks(!tasks ? tasksApi : tasks.concat(tasksApi));
    });
    
  }
  useEffect( () =>{
    fetchApi()
  }, [])

  return (
    <div className="App">
      <TableContainer>
             Lists:<br />
              <TableBody>
      {!lists ? 'cargandooo...' :
      lists.map( ( list, index) => {
        return (
          <>
            <TableRow key={list.name}>
              <TableCell>{list.name}</TableCell>
              <TableCell>
                <Edit className={styles.iconos} onClick={()=>editList(list)}/>
                &nbsp;&nbsp;&nbsp;
                </TableCell>
            </TableRow>             
         </>
        )
      })}
      <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button>
      </TableBody>
      </TableContainer><br /><br /><br />


      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        <div className={styles.modal}> 
        <h3>Add new list</h3>
        <TextField name="name" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
        <br /><br />
        <div align="right">
          <Button color="primary" onClick={()=>postList()}>Insertar</Button>
          <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
      </div>
     </Modal>

     <Modal open={modalShowList} onClose={showModalViewList}>
        <div className={styles.modal}> 
        
        <TableContainer>
          {listSelected.name} Tasks:
          <TableBody>
          {!tasksOfListSelected ? 'cargandooo...' :
            tasksOfListSelected.map( ( task, index) => {
              return (
                <>
                  <TableRow key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell> <TextField name="text" value = {task.text} className={styles.inputMaterial} label="Nombre" onChange={handleChange}/></TableCell>
                    <TableCell> <Checkbox name="mark" checked={task.mark = 'unchecked'? false :true}  className={styles.inputMaterial} label="Nombre" onChange={handleChange}/></TableCell>
                    <TableCell>
                      <Edit className={styles.iconos} onClick={()=>editList(task)}/>
                      &nbsp;&nbsp;&nbsp;
                      <Delete  className={styles.iconos} onClick={()=>console.log(task)}/>
                      </TableCell>
                  </TableRow>             
              </>
              )
            })}
            <TableRow key='new'>
              <TableCell><TextField name="id" disabled className={styles.inputMaterial} label="id" onChange={handleChangeTask}/></TableCell>
                <TableCell><TextField name="text" className={styles.inputMaterial} label="Nombre" onChange={handleChangeTask}/></TableCell>
                <TableCell><Checkbox name="mark" disabled className={styles.inputMaterial} label="Nombre" onChange={handleChangeTask}/></TableCell>
                <TableCell>
                  <Add className={styles.iconos} onClick={()=>onClickAdd()}/>
                </TableCell>
              </TableRow>  
          </TableBody>
        </TableContainer>

        <br /><br />
        <div align="right">
          <Button color="primary" onClick={()=>postList()}>Insertar</Button>
          <Button onClick={()=>showModalViewList()}>Cancelar</Button>
        </div>
      </div>
     </Modal>

    </div>
  );
}

export default App;
