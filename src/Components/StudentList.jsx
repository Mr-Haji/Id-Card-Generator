import React, { useEffect, useRef, useState } from 'react';
import { DB } from '../Config/FireBase/FireBase';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { onValue, ref } from 'firebase/database';
import { toast } from 'react-toastify';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../../public/Pics/Logo.png';
const List = () => {

    const navigate = useNavigate();
    const [IsData, setIsData] = useState([]);
    const tableRef = useRef(null);
    const navigateToNextPage = (path, state) => {
        path ? navigate(path, state) : navigate('/');
    }
    const getProjects = async () => {
        // get data to DB
        try {
            const abc = ref(DB, 'Students')
            onValue(abc, (snapshot) => {
                snapshot.val()
                const StudentList = snapshot.val();
                // push in arr
                const studentsArray = Object.keys(StudentList).map((key) => ({
                    ...StudentList[key],
                }));
                setIsData(studentsArray);
            });

        } catch (error) {
            const failed = error.messDOB;
            error ? ToastThrough(toast.error, "Failed To Fatch") : console.log(failed)
        }
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <Stack sx={{
            width: '100vw',
            alignItems: 'center',
        }}>

            <Stack sx={{
                border: '1px solid #000',
                borderRadius: '30px',
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                height: '100vh',
                p: 2,
                bgcolor: 'rgba(255, 255, 255, 0.7)',



            }}>
                <Stack sx={{ flexDirection: 'row', }}>
                    <img src={Logo} style={{ marginLeft: '-50px', width: '100px', height: '100px' }} />
                    <Stack sx={{
                        flexDirection: 'row',
                        mt: '20px',
                        // border: '1px solid #000',
                        borderRadius: '30px'
                    }}>
                        <TextField label={'Search Student'}
                            sx={{
                                border: 'none',
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '30px',
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'black', // Remove blue border on focus
                                    },
                                },
                                width: '500px'
                            }}
                        />
                        <SearchIcon sx={{ fontSize: '55px' }} />
                    </Stack>
                    <Stack sx={{ mt: '30px', flexDirection: 'row' }}>
                        <DownloadTableExcel
                            filename="users table"
                            sheet="users"
                            currentTableRef={tableRef.current}
                        >              <Button variant='contained' sx={{ ml: 2 }}> Export excel </Button>
                        </DownloadTableExcel>
                        <Button variant='contained' sx={{ height: '38px', ml: 2 }} onClick={() => navigateToNextPage('/')}> Add Student </Button>
                    </Stack>
                </Stack>
                <TableContainer ref={tableRef}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}  >S No</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>Student Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>Father Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>Class</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>DOB</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>Shift</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>Roll Number</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>Phone Numbre</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {IsData.map((e, i) => (
                                <TableRow key={i}>
                                    <TableCell sx={{ textAlign: 'center', }}>{i + 1}</TableCell> {/* S_No based on index */}
                                    <TableCell sx={{ textAlign: 'center', }}>{e.StudentName}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', }}>{e.FatherName}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', }}>{e.Class}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', }}>{e.DOB}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', }}>{e.Shift}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', }}>{e.RollNumber}</TableCell>
                                    <TableCell sx={{ textAlign: 'center', }}>{e.PhoneNumber}</TableCell>

                                    <TableCell sx={{ textAlign: 'center', }} onClick={() => navigateToNextPage('/StdDetails', { state: { id: e.RollNumber } })}>
                                        Details
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Stack>
    )
}

export default List;





