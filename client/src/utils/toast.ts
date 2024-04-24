import { toast, Bounce } from 'react-toastify';


export function showSuccessToast(text: string){
  toast.success(text, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}

