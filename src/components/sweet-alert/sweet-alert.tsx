import Swal from 'sweetalert2';
import { useEffect } from 'react';

type ErrorAlertProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export function ErrorAlert({ open, message, onClose }: ErrorAlertProps) {
  useEffect(() => {
    if (open) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        confirmButtonText: 'OK',
      }).then(() => {
        onClose(); // panggil callback setelah ditutup
      });
    }
  }, [open, message, onClose]);

  return null; // tidak render elemen DOM
}

export function timerAlert({open, message, onClose}: ErrorAlertProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {

  })
}
