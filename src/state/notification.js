import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2000,
  hideProgressBar: true,
};

function error(msg) {
  toast.error(msg, options);
}

function success(msg) {
  toast.success(msg, options);
}

export default {
  error,
  success,
}