import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DB } from '../Config/FireBase/FireBase.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastThrough from './ToastThrough.jsx';
import { useNavigate } from 'react-router-dom';
import { get, limitToLast, orderByKey, query, ref, set } from 'firebase/database';

const AddStudent = () => {
  const navigate = useNavigate()
  const [StudentName, setStudentName] = useState("")
  const [FatherName, setFatherName] = useState("")
  const [Class, setClass] = useState("")
  const [DOB, setDOB] = useState("")
  const [RollNumber, setRollNumber] = useState("")
  const [Shift, setShift] = useState("")
  const [Address, setAddress] = useState("")
  const [AdmissionDate, setAdmissionDate] = useState("")
  const [PhoneNumber, setPhoneNumber] = useState("")
  // getLast Data For New Roll Number 
  const GetLastData = () => {

    // Query to get the last added data

    const dbRef = ref(DB, 'Students');

    const lastDataQuery = query(dbRef, orderByKey(), limitToLast(1));
    // setRollNumber(+'00' + 1)

    get(lastDataQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((childSnapshot) => {
            setRollNumber(+childSnapshot.key + 1)
            // console.log(childSnapshot.key, childSnapshot.val());
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }
  // get Today Date
  const customDate = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();

    const dayName = daysOfWeek[today.getDay()]; // Get day of the week
    const day = today.getDate();                // Get day (1-31)
    const month = today.getMonth() + 1;         // Get month (0-11, so +1 to get 1-12)
    const year = today.getFullYear();           // Get full year (e.g., 2024)
    const fullDate = `${dayName}, ${day}/${month}/${year}`;
    setAdmissionDate(fullDate)
    // console.log(fullDate)
  }
  // Navigate
  const navigateToNextPage = (path, state) => {
    path ? navigate(path, state) : navigate('/');
  }
  // Add Student
  const AddStudent = async (event) => {

    if (StudentName && FatherName && Class && DOB && RollNumber && Shift && Address && PhoneNumber && AdmissionDate) {
      event.preventDefault();
      const AddStudent = {
        StudentName,
        FatherName,
        Class,
        DOB,
        RollNumber,
        Shift,
        Address,
        PhoneNumber,
        AdmissionDate,
      }

      try {
        set(ref(DB, 'Students/' + RollNumber), AddStudent);
        ToastThrough(toast.success, "✔ Student Added");
        navigateToNextPage('/StdDetails', { state: { id: RollNumber } })

      } catch (error) {
        console.log("error", error);
        const failed = error.messDOB;
        error ? ToastThrough(toast.error, "Failed To Send") : console.log(failed)

      }

    }
    else (
      ToastThrough(toast.warn, "Fill All Fields")
    )

  };
  useEffect(() => { GetLastData(), customDate() }, [GetLastData])
  return (
    <Stack sx={{
      flexDirection: 'column',
      width: '100vw', // Increase width to 100% of the viewport
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',


    }}>

      <Stack
        sx={{
          width: '35%',
          borderRadius: '30px',
          p: '15px',
          gap: '15px',
          bgcolor: 'rgba(255, 255, 255, 0.7)',

        }}
      >
        <Typography sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 'Bold' }} >
          Add Student
        </Typography>
        <Stack>

          {/* Text Fields */}
          <Stack sx={{
            gap: '5px',
            // color:'#000'

          }}>

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
                label="Father Nmae"
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
                  fullWidth
                  disabled
                  label={`Roll No is ${RollNumber}` || "Roll Number"}

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
                type='number'
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


          </Stack>
          {/* Buttons */}
          <Button
            onClick={AddStudent}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, height: '35px', fontSize: '18px' }}
          >
            Add Student
          </Button>
          <Button
            onClick={() => navigateToNextPage("/StdList")}
            fullWidth
            variant="contained"
            sx={{ mt: 1, height: '35px', fontSize: '18px' }}          >
            Student List
          </Button>

        </Stack>
      </Stack>
    </Stack >


  );

}

export default AddStudent