import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { DB } from '../Config/FireBase/FireBase';
import { onValue, ref } from 'firebase/database';
import { toast } from 'react-toastify';
import StudentIdCard from '../Components/StudentIdCard';
import { Stack } from '@mui/material';

const CardPrint = () => {
    const [IsData, setIsData] = useState([])
    const { state } = useLocation()

    const getUser = async () => {
        const StdId = state.id;
        console.log(StdId);
        try {
            const abc = ref(DB, `Students/${StdId}`);
            onValue(abc, (snapshot) => {
                console.log(snapshot.val())
                const StudentList = snapshot.val();
                setIsData(StudentList)
            });
        } catch (error) {
            console.log(error);
            ToastThrough(toast.error, "Failed To Fetch");
        }
    };
    console.log(IsData)

    useEffect(() => { getUser() }, [])

    return (
        <Stack className='StudentInfoPage'>
            <StudentIdCard StdName={IsData.StudentName} StdFatherName={IsData.FatherName} StdClass={IsData.Class} StdRollNumber={IsData.RollNumber} StdShift={IsData.Shift} StdPhoneNumber={IsData.PhoneNumber} StdDOB={IsData.DOB} StdImage={IsData.Image} />
        </Stack>
    )
}

export default CardPrint