import {Component, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';
import {AdmonUsuariosState} from '@usuarios/state/admon-usuarios.state';
import {MatDialog} from '@angular/material/dialog';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {IUsuario, Role} from '@modelosUsuarios/usuario.interface';
import {CrudUsuariosComponent} from '@usuarios/componentes/crud-usuarios/crud-usuarios.component';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {SesionState} from '@usuarios/state/sesion.state';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import Swal from 'sweetalert2/dist/sweetalert2';

@Component({
    selector: 'app-usuario-config',
    templateUrl: './usuario-config.component.html',
    styleUrls: ['./usuario-config.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations, trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])]
})
export class UsuarioConfigComponent
{
    roles = Object.values(Role);

    constructor(public _admonUsuarioState: AdmonUsuariosState, private _dialogRef: MatDialog, public _sesionState: SesionState)
    {
    }


    regUsuario(): void
    {
        this._dialogRef.open(CrudUsuariosComponent, {width: '45%'});
    }

    async cambiarPassPorElAdmin(usuario: string): Promise<void>
    {
        const {value: password} = await Swal.fire({
            title: 'Ingresa la nueva contrasena',
            input: 'password',
            inputLabel: 'Contrasena',
            inputAttributes: {
                maxlength: 10,
                autocapitalize: 'off',
                autocorrect: 'off'
            }
        });

        if (password)
        {
            this._admonUsuarioState.actualizarContrasena('', password, usuario, true).subscribe(() =>
            {
                toastSweet(TipoAlerta.satisfactorio, 'Contrasena cambiada correctamente', 5000);
            });
        }
    }

    // customClass: 'swal-text',
    cambiarRole(slideToggle: MatSlideToggle, usuario: IUsuario, rolDeLaLista: Role): void
    {
        // Quitar el rol del usuario
        if (rolDeLaLista === Role.superadmin)
        {
            if (usuario._id === this._sesionState.snapshot._id)
            {
                toastSweet(TipoAlerta.info, `No puedes eleminar este role porque no podras acceder 
                   mas tarde para eliminar este role ingresa con otra cuenta que sea SUPERADMIN`, 5000);
                return;
            }
        }
        this._admonUsuarioState.actualizarRole(usuario._id, rolDeLaLista, slideToggle.checked).subscribe(() =>
        {
            toastSweet(TipoAlerta.satisfactorio, 'Rol actualizado con exito', 5000);
        }, e => toastSweet(TipoAlerta.error, e, 5000));
    }
}
