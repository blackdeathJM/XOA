import {TipoAlerta} from './values.config';
// import Swal from "sweetalert2";
import Swal from 'sweetalert2/dist/sweetalert2';

export const toastSweet = (icon = TipoAlerta.satisfactorio, text: string = '', timer = 0): void =>
{
    Swal.fire({
        icon,
        text,
        position: 'bottom',
        showConfirmButton: false,
        toast: true,
        timer,
        customClass: 'swal-text',
        timerProgressBar: true,
        onOpen: (toast) =>
        {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    }).then();
};

