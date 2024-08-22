import React from 'react'
import AddStudent from '../Components/AddStudent'
import { Stack } from '@mui/material'
import '../index.css'
const Dashboard = () => {
  return (
    <Stack className='AddStudentPage' >
      <AddStudent />
    </Stack>
  )
}

export default Dashboard