import '../index.css'
import { Button, Stack, Typography } from '@mui/material'
import React, { useRef } from 'react'
import StuentPic from '@/Pics/Studentpic.jpeg'
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';

const StudentIdCard = ({ StdName, StdFatherName, StdClass, StdRollNumber, StdPhoneNumber, StdDOB, StdImage }) => {
    const printRef = useRef(); // Create a ref
    const navigate = useNavigate()
    //Print Handel
    const handlePrint = useReactToPrint({
        content: () => printRef.current
    })
    const navigateToNextPage = (path, state) => {
        path ? navigate(path, state) : navigate('/');
    }
    return (
        <Stack sx={{
            flexDirection: 'column',
            width: '100vw', // Increase width to 100% of the viewport
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',

        }}>



            <Stack className='PrintSetting'
                ref={printRef}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    justifyContent: "center",
                    p: 2
                }}
            >
                {/* //Front Side  */}
                <Stack
                    className='Cardbg'
                    sx={{
                        border: '1px solid #000',
                        width: '280px',
                        height: '500px',
                        borderRadius: '30px',
                        p: '15px',
                        gap: '15px',



                    }}
                >
                    {/* Pic+School NAme */}
                    <Stack sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Stack sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Typography sx={{ textAlign: 'center', fontSize: '20px' }}>
                                ALLENDALE COLUMBIA SCHOOL
                            </Typography>
                            <Typography sx={{ fontSize: '20px' }}>
                                ID Card
                            </Typography>

                        </Stack>
                        <Stack sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <img style={{
                                width: 200,
                                height: 200,
                                border: '2px solid #000',
                                borderRadius: '50%'
                            }} src={StdImage || StuentPic} alt='Pic'></img>
                            <Typography sx={{ fontSize: '20px' }}>
                                {StdName + ' ' + StdFatherName || 'No Name'}
                            </Typography>
                        </Stack>
                    </Stack>

                    {/* Student Details  */}
                    <Stack sx={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        {/* Text Fields */}
                        <Stack sx={{
                            gap: '10px'
                        }}>

                            <Stack>
                                <Typography sx={{ fontSize: '17px' }} >Class : {StdClass || 'No Class'}</Typography>
                            </Stack>
                            <Stack>
                                <Typography sx={{ fontSize: '17px' }}>Roll Number :{StdRollNumber || 'No Roll Number'}</Typography>
                            </Stack>
                            <Stack>
                                <Typography sx={{ fontSize: '17px' }}>Phone Number :{StdPhoneNumber || 'No Number'}</Typography>
                            </Stack>
                            <Stack>
                                <Typography sx={{ fontSize: '17px' }}>DOB :{StdDOB || 'No Address'}</Typography>
                            </Stack>



                        </Stack>

                    </Stack>
                </Stack>
                {/* Back SIde  */}
                <Stack
                    className='Cardbg'
                    sx={{
                        border: '1px solid #000',
                        width: '280px',
                        height: '500px',
                        borderRadius: '30px',
                        p: '20px',
                        justifyContent: 'space-between'


                    }}
                >
                    {/*Term & Conidition */}
                    <Stack sx={{
                        justifyContent: 'center',
                    }}>
                        <Stack sx={{
                            alignItems: 'center',
                        }}>
                            <Typography sx={{ fontSize: '18px' }}>
                                Term & Condition
                            </Typography>

                        </Stack>
                        <Stack >
                            <Stack>
                                <ul>

                                    <li>
                                        <Typography sx={{ fontSize: '10px' }}>Carry the ID card always on school premises and show it when requested.</Typography>
                                    </li>
                                    <li>
                                        <Typography sx={{ fontSize: '10px' }}>Carry the ID card always on school premises and show it when requested.</Typography>
                                    </li>
                                    <li>
                                        <Typography sx={{ fontSize: '10px' }}>Carry the ID card always on school premises and show it when requested.</Typography>
                                    </li>
                                    <li>
                                        <Typography sx={{ fontSize: '10px' }}>Carry the ID card always on school premises and show it when requested.</Typography>
                                    </li>
                                    <li>
                                        <Typography sx={{ fontSize: '10px' }}>Carry the ID card always on school premises and show it when requested.</Typography>
                                    </li>
                                    <li>
                                        <Typography sx={{ fontSize: '10px' }}>Carry the ID card always on school premises and show it when requested.</Typography>
                                    </li>
                                    <li>
                                        <Typography sx={{ fontSize: '10px' }}>Carry the ID card always on school premises and show it when requested.</Typography>
                                    </li>

                                </ul>
                            </Stack>

                        </Stack>
                    </Stack>

                    {/* Authority Signature  */}
                    <Stack sx={{
                        justifyContent: 'space-around',
                        borderTop: '1px solid #000',
                        height: '50%',
                        gap: '10px'
                    }}>

                        {/* Text Fields */}
                        <Stack sx={{
                            gap: '15px'
                        }}>

                            <Stack>
                                <Typography sx={{ fontSize: '13px', textAlign: 'center' }}> ALLENDALE COLUMBIA SCHOOL</Typography>
                                <Stack>
                                    <Typography sx={{ fontSize: '12px', textAlign: 'center' }}>519 Allens Creek Road
                                        Rochester, NY 14618</Typography>
                                </Stack>
                            </Stack>
                            <Stack>
                                <Typography sx={{ fontSize: '15x', fontWeight: 'bold', textAlign: 'center' }}>Conatct Us:</Typography>
                                <Typography sx={{ fontSize: '15px', textAlign: 'center' }}> 585.381.4560 </Typography>
                            </Stack>

                        </Stack>
                        <Stack sx={{
                            alignItems: 'center',
                        }}>


                            <Stack sx={{
                                border: '1px solid #000',
                                width: '200px                           ',
                                height: '80px',
                                justifyContent: 'end',
                                alignItems: 'center'
                            }}>

                                <Typography>Sigin & Attestation</Typography>
                            </Stack>

                        </Stack>

                    </Stack>
                </Stack>
            </Stack >
            <Stack sx={{
                width: '100vw',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 2

            }}>
                <Button variant='contained' sx={{ width: '250px' }} onClick={handlePrint}>Print</Button>
                <Button variant='contained' sx={{ width: '250px' }} onClick={() => { navigateToNextPage('/StdDetails', { state: { id: StdRollNumber } }) }}>Cancel</Button>
            </Stack>
        </Stack>

    )
}

export default StudentIdCard