import { Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DB } from '../Config/FireBase/FireBase'
import { onValue, ref, remove, } from 'firebase/database'
import ToastThrough from './ToastThrough'
import { toast } from 'react-toastify'
import ProfilePic from '../Pics/Logo.png'
const StudentDetail = () => {
    const [IsData, setIsData] = useState([])
    const { state } = useLocation()

    const navigate = useNavigate()

    const navigateToNextPage = (path, state) => {
        path ? navigate(path, state) : navigate('/');
    }
    // getUser
    const getUser = async () => {
        const StdId = state.id;
        // console.log(StdId===null);
        if (StdId) {
            try {
                const abc = ref(DB, `Students/${StdId}`);
                onValue(abc, (snapshot) => {
                    // console.log(snapshot.val())
                    const StudentList = snapshot.val();
                    setIsData(StudentList)
                });
            } catch (error) {
                console.log(error);
                ToastThrough(toast.error, "Failed To Fetch");
            }
        }
        else (navigateToNextPage('/'))
    };
    // removeUser
    const removeStudent = () => {
        const paswordGet = prompt('Pasword')
        if (paswordGet === 'admin') {
            try {
                const DelUserId = IsData.RollNumber
                console.log(DelUserId)
                const studentRef = ref(DB, `Students/${DelUserId}`);
                remove(studentRef);
                navigateToNextPage('/StdList')
                ToastThrough(toast.success, 'Student Deleted')
            } catch (error) {
                const failed = error.messDOB;
                error ? ToastThrough(toast.error, "Failed To Removed") : console.log(failed)
            }
        }
        else (ToastThrough(toast.error, 'Incorrect Pasword'))
    };
    //Update
    const EditStd = async () => {
        const paswordGet = prompt('Pasword')


        if (paswordGet === 'admin') {
            const UID = IsData.RollNumber
            // console.log(UID)
            navigateToNextPage('/updateDetails', { state: { id: UID } })

        }
        else (ToastThrough(toast.error('Incorrect Pasword')))

    }
    //For Print
    const ForCardPrint = async () => {
        const UID = IsData.RollNumber
        // console.log(UID)
        navigateToNextPage('/IdCardPrint', { state: { id: UID } })



    }
    useEffect(() => {
        getUser()
    }, [])

    return (
        <Stack sx={{
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
        }} >
            <Stack sx={
                {
                    border: '1px solid #000',
                    borderRadius: '30px',
                    width: '90%',
                    p: 1,
                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                    justifyContent: 'space-evenly',



                }
            }>

                <Stack sx={{
                    flexDirection: 'column',
                    // justifyContent: 'space-around',
                    alignItems: 'center'

                }}>
                    <Stack sx={{ flexDirection: 'row', gap: 2 }}>

                        <Button variant='contained' onClick={() => navigateToNextPage('/')}> Add Student </Button>
                        <Button variant='contained' onClick={() => navigateToNextPage('/StdList')}> Student List </Button>
                    </Stack>
                    <Stack sx={{
                        flexDirection: 'row',
                        gap: 2,
                        mt: 1
                    }}>
                        <Button variant='contained' onClick={EditStd}>Edit</Button>
                        <Button variant='contained' onClick={removeStudent}>Del</Button>
                        <Button variant='contained' onClick={ForCardPrint}>Id Card</Button>
                    </Stack>
                    <Stack sx={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img src={ProfilePic} alt='ProfilePic' style={{ margin: '25px', width: '250px', height: '250px', borderRadius: '50%', border: '3px solid #000' }} />
                        <Typography sx={{ fontSize: '30px' }}>
                            {IsData.StudentName + ' ' + IsData.FatherName || 'Student Name'}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',

                }}>
                    <Stack >
                        <Typography sx={{ fontSize: '18px' }} >Student Name :{IsData.StudentName || 'Student Name'}</Typography>
                        <Typography sx={{ fontSize: '18px' }}>Father Name :{IsData.FatherName || 'Father Name'}</Typography>
                        <Typography sx={{ fontSize: '18px' }}>Class :{IsData.Class || '00'}</Typography>
                        <Typography sx={{ fontSize: '18px' }}>Phone Number :{IsData.PhoneNumber || '00'}</Typography>
                        <Typography sx={{ fontSize: '18px' }}>Address :{IsData.Address || '00'}</Typography>

                    </Stack>
                    <Stack>
                        <Typography sx={{ fontSize: '18px' }}>Age:{IsData.DOB || '00'}</Typography>
                        <Typography sx={{ fontSize: '18px' }}>Shift :{IsData.Shift || '00'}</Typography>
                        <Typography sx={{ fontSize: '18px' }}>Roll Number :{IsData.RollNumber || '00'}</Typography>
                        <Typography sx={{ fontSize: '18px' }}>Shift :{IsData.Shift || '00'}</Typography>
                        <Typography sx={{ fontSize: '18px' }}>Admission Date :{IsData.AdmissionDate || '00'}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )

}
export default StudentDetail


