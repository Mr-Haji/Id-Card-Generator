import React, { useEffect, useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { onValue, ref, update } from 'firebase/database';
import { DB } from '../Config/FireBase/FireBase';
import ToastThrough from './ToastThrough';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function TransitionsModal() {
    const [StudentName, setStudentName] = useState("");
    const [FatherName, setFatherName] = useState("");
    const [Class, setClass] = useState("");
    const [DOB, setDOB] = useState("");
    const [RollNumber, setRollNumber] = useState("");
    const [Shift, setShift] = useState("");
    const [Address, setAddress] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [IsData, setIsData] = useState(null); // Initialize as null to check if data is loaded

    const navigate = useNavigate();
    const { state } = useLocation();
    const navigateToNextPage = (path, state) => {
        path ? navigate(path, state) : navigate('/');
    };
    // getUser
    const getUser = async () => {
        const StdId = state.id;
        // console.log(StdId);

        try {
            const abc = ref(DB, `Students/${StdId}`);
            onValue(abc, (snapshot) => {
                const StudentList = snapshot.val();
                if (StudentList) {
                    setIsData(StudentList);
                    // Set the form fields with the existing data
                    setStudentName(StudentList.StudentName || "");
                    setFatherName(StudentList.FatherName || "");
                    setClass(StudentList.Class || "");
                    setDOB(StudentList.DOB || "");
                    setRollNumber(StudentList.RollNumber || "");
                    setShift(StudentList.Shift || "");
                    setAddress(StudentList.Address || "");
                    setPhoneNumber(StudentList.PhoneNumber || "");
                }
            });
        } catch (error) {
            console.log(error);
            ToastThrough(toast.error, "Failed To Fetch");
        }
    };
    // updateUser
    const UpdateUser = () => {
        if (StudentName && FatherName && Class && DOB && RollNumber && Shift && Address) {
            try {
                const UpdatedData = {
                    StudentName,
                    FatherName,
                    Class,
                    DOB,
                    RollNumber,
                    Shift,
                    Address,
                    PhoneNumber,
                };
                const StdId = state.id;
                const UpdeateRef = ref(DB, `Students/${StdId}`);
                update(UpdeateRef, UpdatedData);
                ToastThrough(toast.success, "✔ Student Updated");
                console.log(RollNumber,
                    'df', IsData.RollNumber
                )
                navigateToNextPage('/StdDetails', { state: { id: RollNumber } });
            } catch (error) {
                console.log("error", error);
                ToastThrough(toast.error, "Failed To Send");
            }
        } else {
            ToastThrough(toast.warn, "Fill All Fields");
        }
    };
    useEffect(() => {
        getUser();
    }, []);

    return (
        <Stack sx={{
            flexDirection: 'column',
            width: '100vw',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            <Stack sx={{
                width: '35%',
                borderRadius: '30px',
                p: '15px',
                gap: '15px',
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid #000'

            }}>
                <Typography sx={{ textAlign: 'center' , fontSize:'25px',fontWeight:'Bold' }} >
                    Update Student
                </Typography>
                <Stack>
                    <TextField
                        required
                        fullWidth
                        value={StudentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        label="Student Name"
                    />
                </Stack>
                <Stack>
                    <TextField
                        required
                        fullWidth
                        value={FatherName}
                        onChange={(e) => setFatherName(e.target.value)}
                        label="Father Name"
                    />
                </Stack>
                <Stack sx={{ flexDirection: 'row', gap: '15px' }}>
                    <Stack width={"49%"}>
                        <TextField
                            autoComplete="given-name"
                            required
                            fullWidth
                            value={Class}
                            onChange={(e) => setClass(e.target.value)}
                            label="Class"
                            autoFocus
                        />
                    </Stack>
                    <Stack width={"49%"}>
                        <TextField
                            required
                            fullWidth
                            value={DOB}
                            label="DOB"
                            onChange={(e) => setDOB(e.target.value)}
                            autoComplete="family-name"
                        />
                    </Stack>
                </Stack>
                <Stack sx={{ flexDirection: 'row', gap: '15px' }}>
                    <Stack width={"49%"}>
                        <TextField
                            required
                            fullWidth
                            value={RollNumber}
                            label="Roll Number"
                            onChange={(e) => setRollNumber(e.target.value)}
                            autoComplete="family-name"
                        />
                    </Stack>
                    <Stack width={"49%"}>
                        <TextField
                            required
                            fullWidth
                            value={Shift}
                            label="Shift"
                            onChange={(e) => setShift(e.target.value)}
                            autoComplete="family-name"
                        />
                    </Stack>
                </Stack>
                <Stack>
                    <TextField
                        required
                        fullWidth
                        value={PhoneNumber}
                        label="Phone Number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Stack>
                <Stack>
                    <TextField
                        required
                        fullWidth
                        multiline
                        maxRows={5}
                        value={Address}
                        label="Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Stack>
                <Button variant='contained' onClick={UpdateUser}>Submit</Button>
                <Button variant='contained' onClick={() => { navigateToNextPage('/StdDetails', { state: { id: RollNumber } }) }}>Cancel</Button>

            </Stack>
        </Stack>
    );
}
