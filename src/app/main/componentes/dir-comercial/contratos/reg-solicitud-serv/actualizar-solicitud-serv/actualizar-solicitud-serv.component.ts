import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {IModalInfo} from '@funcionesRaiz/modal.interface';
import {IResSolicitud, ISolicitudServ} from '@dir-comercial/solicitudServ.interface';
import {finalize} from 'rxjs/operators';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';

@Component({
    selector: 'app-actualizar-solicitud-serv',
    templateUrl: './actualizar-solicitud-serv.component.html',
    styleUrls: ['./actualizar-solicitud-serv.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActualizarSolicitudServComponent
{
    estaCargando = false;
    formActSolitudServ: FormGroup = this._fb.group({
        observaciones: [''],
        aprobadoServ: [null, RxwebValidators.required({message: 'Selecciona si el servicio fue aprobado'})],
        ejecutadaPor: ['', RxwebValidators.required({message: 'Registra la persona que realizo la solicitud'})]
    });

    constructor(private _fb: FormBuilder, private _solicitudState: SolicitudesState, @Inject(MAT_DIALOG_DATA) private data: IModalInfo, private _dr: MatDialog,
                private _cd: ChangeDetectorRef)
    {
    }

    actSolicitud(): void
    {
        this.estaCargando = true;
        const datos = this.data.datos as ISolicitudServ;
        const aprobar: boolean = this.formActSolitudServ.get('aprobadoServ').value === 'true';
        this._solicitudState.actualizarSolicitud(datos._id, this.formActSolitudServ.get('observaciones').value, aprobar,
            this.formActSolitudServ.get('ejecutadaPor').value).pipe(finalize(() =>
        {
            this.estaCargando = false;
            this._cd.detectChanges();
            this.cerrarModal();
        })).subscribe((res: IResSolicitud) =>
        {
            if (res.documento)
            {
                toastSweet(TipoAlerta.satisfactorio, 'La solicitud fue actualizada con exito', 5000);
            } else
            {
                toastSweet(TipoAlerta.error, 'Ocurrio un erro al tratar de actualizar la solicitud', 5000);
            }
        });
    }

    cerrarModal(): void
    {
        this._dr.closeAll();
    }
}
