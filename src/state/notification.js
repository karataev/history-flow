import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function error(msg) {
  toast.error(msg, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose: 2000,
    hideProgressBar: true,
  });
}

export default {
  error,
}