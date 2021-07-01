import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {SesionState} from '@usuarios/state/sesion.state';
import {GralesServices} from '@services/grales.service';
import {Role} from '@modelosUsuarios/usuario.interface';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate
{
    constructor(private _sesionState: SesionState, private _serviciosGrales: GralesServices)
    {

    }

    canActivate(): Observable<boolean> | boolean
    {
        return this._serviciosGrales.compararRoles(this._sesionState.snapshot.role, Role.superadmin);
    }
}
