import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {SesionState} from '@usuarios/state/sesion.state';
import {GralesServices} from '@services/grales.service';
import {Role} from '@modelosUsuarios/usuario.interface';

@Injectable({
    providedIn: 'root'
})
export class TelemetriaGuard implements CanActivate
{
    constructor(private _sesionState: SesionState, private _serviciosGrales: GralesServices)
    {

    }

    canActivate(): Observable<boolean> | boolean
    {
        const tele = this._serviciosGrales.compararRoles(this._sesionState.snapshot.role, Role.telemetria);
        console.log('guard Telemeria', tele);
        return tele;
    }

}
