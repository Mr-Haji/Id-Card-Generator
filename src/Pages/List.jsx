import React from 'react'
import StudentList from '../Components/StudentList.jsx'
import '../index.css'
import { Stack } from '@mui/material'


const List = () => {
  return (
    <Stack className='StudentListPage' >
      <StudentList />
    </Stack>
  )
}

export default List