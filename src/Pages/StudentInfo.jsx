import React from 'react'
import StudentDetail from '../Components/StudentDetail'
import { Stack } from '@mui/material'
import '../index.css'

const StudentInfo = () => {
  return (
    <Stack className='StudentInfoPage' >
      <StudentDetail />
    </Stack>
  )
}

export default StudentInfo