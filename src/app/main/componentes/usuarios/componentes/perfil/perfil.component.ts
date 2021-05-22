import {Component, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ILoginToken} from '@modelosUsuarios/usuario.interface';
import {fuseAnimations} from '@plantilla/animations';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {toastSweet} from '@shared/alerts/toasts';
import {Router} from '@angular/router';
import {actualizarContrasena} from '../../../../validators/validadores';
import {TipoAlerta} from '@shared/alerts/values.config';
import {SesionState} from '@usuarios/state/sesion.state';
import {botonGuardarConfig} from '@services/botonGuardarConfig';
import {IOpcionesCarga} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {AdmonUsuariosState} from '@usuarios/state/admon-usuarios.state';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss'],
    animations: [fuseAnimations],
    encapsulation: ViewEncapsulation.None
})
export class PerfilComponent
{
    formCambiarContrasena: FormGroup;
    opcionesButtonSpinner = botonGuardarConfig();
    opcionesCarga: IOpcionesCarga =
        {
            allowedFileType: ['image'],
            allowedMimeType: ['image/png', 'image/jpg', 'image/jpeg'],
            autoCargar: true,
            esIconButton: false,
            icono: 'publish',
            multiple: false,
            textoBoton: 'Selecciona tu imagen de perfil',
            claseColorBtn: 'amber',
            prefijo: 'per',
            reemplazar: true,
            nombreReemplazar: this._sesionState.snapshot.img
        };

    constructor(private _dialogRef: MatDialog, public _sesionState: SesionState, private _formBuilder: FormBuilder, private _router: Router,
                private _admonUsuarioState: AdmonUsuariosState)
    {
        this.formCambiarContrasena = this._formBuilder.group(
            {
                contrasenaActual: ['', Validators.required],
                contrasena: ['', Validators.required],
                confirmarContrasena: ['', Validators.required]
            }
        );
        this.formCambiarContrasena.setValidators(actualizarContrasena);
    }

    cambiarContrasena(): void
    {
        this.opcionesButtonSpinner = botonGuardarConfig(true, 'save', 'Guardando...');
        this._admonUsuarioState.actualizarContrasena(this.formCambiarContrasena.get('contrasenaActual').value,
            this.formCambiarContrasena.get('contrasena').value, this._sesionState.snapshot.usuario, false).subscribe((res: ILoginToken) =>
        {
            if (res.estatus)
            {
                toastSweet(TipoAlerta.satisfactorio, res.mensaje, 5000);
                this.opcionesButtonSpinner = botonGuardarConfig();
                localStorage.removeItem('token');
                this._router.navigate(['/seguridad/login']).then();

            } else
            {
                toastSweet(TipoAlerta.error, res.mensaje, 5000);
                this.opcionesButtonSpinner = botonGuardarConfig();
            }
        });
    }

    archivoRecibido(): void
    {
        toastSweet(TipoAlerta.satisfactorio, `Se ha cambiado con exito la imagen de perfil, 
        podras ver los cambios realizado en el proximo inicio de sesion`, 5000);
    }
}
