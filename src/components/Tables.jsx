import React, { useRef, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from './Loader';
import {BiEditAlt} from 'react-icons/bi'
import {RiDeleteBin2Fill} from 'react-icons/ri'
let date = 0;

const Tables = () => {
  const inp  = useRef(null);
  // States
  const [exer, setExer] = useState("")
  const [set1, setSet1] = useState(0)
  const [set2, setSet2] = useState(0)
  const [set3, setSet3] = useState(0)
  const [set4, setSet4] = useState(0)
  const [rest, setRest] = useState('')
  const [weight, setWeight] = useState('')
  const [tablesFound , setTablesFound] = useState(true)
  const [selectedTable, setSelectedTable] = useState({})
  const [index , setIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [warning, setWarning] = useState(false)
  const [editSuccess, setEditSuccess] = useState(false)
  const [createSuccess, setCreateSuccess] = useState(false)

  // Functions

  const addRow = (e) => {
    e.preventDefault();
    if(exer) {
      setWarning(false);
      // Getting Data From The Local Storage
      const prevTables = JSON.parse(localStorage.getItem('tables'))
      let currentIndex;
      for (let i = 0; i < prevTables.length; i++) {
          if(prevTables[i].date === selectedTable.date) {
            currentIndex = i;
            break;
          }
      }
      let extractedIndex = prevTables.splice(currentIndex,1);
      extractedIndex[0]?.rows.push({
        exer,
        set1,
        set2,
        set3,
        set4,
        rest,
        weight
      })
      prevTables.push(extractedIndex[0])
      // Saving Data in The Local Storage
      window.localStorage.setItem('tables' , JSON.stringify(prevTables))
      
      selectedTable.rows.push({
        exer,
        set1,
        set2,
        set3,
        set4,
        rest,
        weight
      })

      setExer("");
      setSet1("");
      setSet2("");
      setSet3("");
      setSet4("");
      setRest("");
      setWeight("");
    } else {
      setWarning(true);
    }
  }


  const editRow = (i) => {

    setIsEditing(true);
    setIndex(i);
    setExer(selectedTable.rows[i].exer)
    setSet1(selectedTable.rows[i].set1)
    setSet2(selectedTable.rows[i].set2)
    setSet3(selectedTable.rows[i].set3)
    setSet4(selectedTable.rows[i].set4)
    setRest(selectedTable.rows[i].rest)
    setWeight(selectedTable.rows[i].weight)
  }
  

  const submitRow = (e) => {
    e.preventDefault();
    // Getting Data From The Local Storage
    const prevTables = JSON.parse(localStorage.getItem('tables'))
    let currentIndex;
    for (let i = 0; i < prevTables.length; i++) {
        if(prevTables[i].date === selectedTable.date) {
          currentIndex = i;
          break;
        }
    }
    let extractedIndex = prevTables.splice(currentIndex,1);
    extractedIndex[0].rows[index].exer = exer;
    extractedIndex[0].rows[index].set1 = set1;
    extractedIndex[0].rows[index].set2 = set2;
    extractedIndex[0].rows[index].set3 = set3;
    extractedIndex[0].rows[index].set4 = set4;
    extractedIndex[0].rows[index].rest = rest;
    extractedIndex[0].rows[index].weight = weight;
    prevTables.push(extractedIndex[0])
    // Saving Data in The Local Storage
    window.localStorage.setItem('tables' , JSON.stringify(prevTables))

    selectedTable.rows[index].exer = exer
    selectedTable.rows[index].set1 = set1
    selectedTable.rows[index].set2 = set2
    selectedTable.rows[index].set3 = set3
    selectedTable.rows[index].set4 = set4
    selectedTable.rows[index].rest = rest
    selectedTable.rows[index].weight = weight
    setExer("");
    setSet1("");
    setSet2("");
    setSet3("");
    setSet4("");
    setRest("");
    setWeight("");
    setIsEditing(false);
    setEditSuccess(true);
    setTimeout(() => setEditSuccess(false) , 1000)
  }


  const deleteRow = (i) => {
    // Getting Data From The Local Storage
    const prevTables = JSON.parse(localStorage.getItem('tables'))
    let tableInStorage;
    for (let j = 0; j < prevTables.length; j++) {
        if(prevTables[j].date === selectedTable.date) {
          tableInStorage = prevTables[j];
          break;
        }
    }
    tableInStorage.rows.splice(i,1)
    // Saving Data in The Local Storage
    window.localStorage.setItem('tables' , JSON.stringify(prevTables))
    // Removing Table from the UI
    selectedTable.rows.splice(i,1)
  }

  const changeTable = (e) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);

    date = inp.current.value;
    console.log(date);

    // Getting Data From The Local Storage
    const prevTables = JSON.parse(localStorage.getItem('tables'))  

    if(prevTables?.find(workout => workout.date === date)) { // selectedTable
      setSelectedTable(prevTables.find(workout => workout.date === date))
      setTablesFound(true)
    } else {
      setTablesFound(false)
    }
  }
  const createNewTable = () => {

    // Getting Data From The Local Storage
    const prevTables = JSON.parse(localStorage.getItem('tables'))  
    // Saving Data in The Local Storage
    if(prevTables) {
      window.localStorage.setItem('tables' , JSON.stringify([ ...prevTables , {
        date: date,
        rows: [
        ],
      }]))
    } else {
      window.localStorage.setItem('tables' , JSON.stringify([{
        date: date,
        rows: [
        ],
      }]))
    }
    changeTable();
    setCreateSuccess(true);
    setTimeout(() => setCreateSuccess(false) , 4000)
  }
  return (
    <>
    <div className='main-color p-12'>
      <p className='text-white text-center'>Select The Workout Day</p>
      <input onChange={changeTable} ref={inp} className='block w-1/4 mx-auto text-center' type="date" name="" id="" />
    </div>
    <section className='main-color h-[70vh] flex justify-center items-center flex-col space-y-12 px-12' id='tables'>
    { isLoading ?
    <Loader/>
    :
      (
        tablesFound ?
        <>
          <TableContainer component={Paper}>
            <p className='text-center block py-2 font-bold border-b'>{date}</p>
            <Table sx={{ minWidth: 650}} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Exercise Name</TableCell>
                    <TableCell align="center">Set(1)</TableCell>
                    <TableCell align="center">Set(2)</TableCell>
                    <TableCell align="center">Set(3)</TableCell>
                    <TableCell align="center">Set(4)</TableCell>
                    <TableCell align="center">Rest Period(Min)</TableCell>
                    <TableCell align="center">Weight Lifted(KG)</TableCell>
                    <TableCell align="center">Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {selectedTable?.rows?.map((row,index) => (
                      <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                          <TableCell sx={{fontWeight: 'bold' , fontSize: '23px'}} component="th" scope="row">{row?.exer}</TableCell>
                          <TableCell align="center">{row?.set1}</TableCell>
                          <TableCell align="center">{row?.set2}</TableCell>
                          <TableCell align="center">{row?.set3}</TableCell>
                          <TableCell align="center">{row?.set4}</TableCell>
                          <TableCell align="center">{row?.rest}</TableCell>
                          <TableCell align="center">{row?.weight}</TableCell>
                          <TableCell align="center">
                            <div className='flex space-x-2 justify-center'>
                              <button className='flex items-center bg-slate-600 text-white px-4 py-2 rounded-md duration-150 hover:scale-110 overflow-hidden relative group' onClick={() => editRow(index)} >
                                <span className='relative top-0 group-hover:top-[-250%] duration-300'>EDIT</span> 
                                <BiEditAlt size={17} className='absolute left-[50%] translate-x-[-50%] top-[250%] translate-y-[-50%] group-hover:top-[50%] duration-300'/>
                                </button>
                              <button className='flex items-center bg-red-700 text-white p-2 rounded-md duration-150 hover:scale-110 overflow-hidden relative group' onClick={(e) => {
                                e.target.parentElement.parentElement.parentElement.style.display = 'none';
                                deleteRow(index)
                                }}>
                                  <span className='relative top-0 group-hover:top-[-250%] duration-300'>DELETE</span> 
                                  <RiDeleteBin2Fill size={17} className='absolute left-[50%] translate-x-[-50%] top-[250%] translate-y-[-50%] group-hover:top-[50%] duration-300'/>
                                  </button>
                            </div>
                          </TableCell>
                      </TableRow>
                
                ))}
                </TableBody>
            </Table>
          </TableContainer>
          <form className='flex space-x-2 xs:flex-col lg:flex-row text-center text-white'>
          <div>
            <label htmlFor="">Exercise name</label>
            <input onChange={({target}) => setExer(target.value)} value={exer} className='text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none' type="text" />
          </div>
          <div>
            <label htmlFor="">Set(1)</label>
            <input onChange={({target}) => setSet1(target.value)} value={set1} className='text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none' type="number" />
          </div>
          <div>
            <label htmlFor="">Set(2)</label>
            <input onChange={({target}) => setSet2(target.value)} value={set2} className='text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none' type="number" />
          </div>
          <div>
            <label htmlFor="">Set(3)</label>
            <input onChange={({target}) => setSet3(target.value)} value={set3} className='text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none' type="number" />
          </div>
          <div>
            <label htmlFor="">Set(4)</label>
            <input onChange={({target}) => setSet4(target.value)} value={set4} className='text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none' type="number" />
          </div>
          <div>
            <label htmlFor="">Rest Period</label>
            <input onChange={({target}) => setRest(target.value)} value={rest} className='text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none' type="text" />
          </div>
          <div>
            <label htmlFor="">Weight Lifted</label>
            <input onChange={({target}) => setWeight(target.value)} value={weight} className='text-center font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 xs:w-[200px] lg:w-[120px] xl:w-[150px] outline-none' type="number" />
          </div>
          {
            isEditing ?
              <motion.button 
              className='text-white border px-4 py-1 text-xl rounded-lg eval italic'
              whileHover={{scale: 1.1 , transition: {ease: "linear", repeat: Infinity, repeatType: "reverse"} }}
              transition={{ duration: .5}}
              onClick={submitRow}>
                  Submit Row
              </motion.button>
            :
              <motion.button 
                className='text-white border px-4 py-1 text-xl rounded-lg eval italic'
                whileHover={{scale: 1.1 , transition: {ease: "linear", repeat: Infinity, repeatType: "reverse"} }}
                transition={{ duration: .5}}
                onClick={addRow}>
                    Add Row
              </motion.button>
          }
          </form>
          <AnimatePresence>
          {
            warning 
            && 
            <motion.p 
            className='text-red-600 font-bold'
            initial={{x: '-100vh'}}
            animate={{x: 0}}
            exit={{opacity: 0}}
            >Please enter exercise name!</motion.p>
          }
          </AnimatePresence>
          <AnimatePresence>
          {
            editSuccess 
            && 
            <motion.p 
            className='text-green-600 font-bold'
            initial={{x: '-100vh'}}
            animate={{x: 0}}
            exit={{opacity: 0}}
            >Editted Succesfully</motion.p>
          }
          </AnimatePresence>
          <AnimatePresence>
          {
            createSuccess 
            && 
            <motion.p 
            className='text-green-600 font-bold'
            initial={{x: '-100vh'}}
            animate={{x: 0}}
            transition={{delay: .5}}
            exit={{opacity: 0}}
            >Created Succesfully</motion.p>
          }
          </AnimatePresence>
        </>
        :
        <motion.div
        initial={{y: 15}}
        animate={{y:0}}
        className='text-center space-y-10'
        >
        <p className='text-white text-4xl'>No Workouts Found!</p>
        <motion.button 
        className='text-white border rounded-md px-6 py-1 create-new'
        whileHover={{scale: 1.1 , transition: {ease: "linear", repeat: Infinity, repeatType: "reverse"} }}
        transition={{ duration: .5}}
        onClick={createNewTable}
        >Create New Workout</motion.button>
        </motion.div>
    )
    }
    </section>
    </>
  )
}

export default Tables