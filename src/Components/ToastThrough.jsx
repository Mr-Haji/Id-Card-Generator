import { Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastThrough = (toastName, message) => {
    return (
        toastName(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        })
  )
}

export default ToastThrough