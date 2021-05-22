import {FormGroup} from '@angular/forms';

export function actualizarContrasena(controles: FormGroup): { [llave: string]: any } | null
{
    const contrasena = controles.get('contrasena').value;
    const confirmarContrasena = controles.get('confirmarContrasena').value;

    if (contrasena !== confirmarContrasena)
    {
        return {
            confirmarContrasena: true
        };
    }
    return null;
}
