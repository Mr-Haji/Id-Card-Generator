import React from 'react'
import AppRouter from './Config/Auth Guard/AppRouter.jsx'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (<>

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <AppRouter />

  </>
  )
}

export default App