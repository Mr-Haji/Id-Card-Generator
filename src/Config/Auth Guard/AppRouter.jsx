import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../../Pages/Dashboard.jsx'
import CardPrint from '../../Pages/CardPrint.jsx'
import List from '../../Pages/List.jsx'
import StudentInfo from '../../Pages/StudentInfo.jsx'
import UpdateStudent from '../../Pages/UpdateStudent.jsx'


const AppRouter = () => {

  return (<>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/StdList' element={<List />} />
      <Route path='/IdCardPrint' element={<CardPrint />} />
      <Route path='/StdDetails' element={<StudentInfo />} />
      <Route path='/updateDetails' element={<UpdateStudent />} />

    </Routes>
  </>
  )
}

export default AppRouter