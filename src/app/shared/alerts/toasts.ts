import {TipoAlerta} from './values.config';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2';
// import Swal from 'sweetalert2/src/sweetalert2';


const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    customClass: 'swal-text',
    timerProgressBar: true,
    showConfirmButton: false,
    width: 'auto',
    maxWidth: '80%'
});

export const toastSweet = (icon = TipoAlerta.satisfactorio, text: string = '', timer = 0): void =>
{
    Toast.fire({
        icon,
        text,
        timer,
        onOpen: (toast: { addEventListener: (arg0: string, arg1: any) => void; }) =>
        {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    }).then();
};
