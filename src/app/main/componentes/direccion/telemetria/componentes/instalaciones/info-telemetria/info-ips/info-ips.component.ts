import {ChangeDetectionStrategy, Component, Inject, Input, Optional, ViewEncapsulation} from '@angular/core';
import {IInstalacion} from '@telemetria/instalacion-interface';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {IRegIp} from '@telemetria/telemetria-interface';
import {RegDirIpComponent} from '@telemetria/instalaciones/info-telemetria/reg-dir-ip/reg-dir-ip.component';
import {TelemetriaState} from '@telemetria/telemetriaState';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';

@Component({
    selector: 'app-info-ips',
    templateUrl: './info-ips.component.html',
    styleUrls: ['./info-ips.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoIpsComponent
{
    @Input() set instSelectTele(val: IInstalacion)
    {
        this._instSelectTele = val;
    }

    @Input() set tipo(val: string)
    {
        this._tipo = val;
    }

    @Input() set verAcciones(val: boolean)
    {
        this._verAcciones = val;
    }

    @Input() set soloLectura(val: boolean)
    {
        this._soloLectura = val;
    }

    _instSelectTele: IInstalacion;
    _tipo: string;
    _verAcciones = true;
    _soloLectura = false;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: IRegIp, private _dialogRef: MatDialog, private _teleState: TelemetriaState)
    {
    }

    editarIp(dir: string): void
    {
        const data: IRegIp =
            {
                _id: this._instSelectTele._id,
                tipo: this._tipo,
                ip: dir,
                esActualizacion: true
            };
        this._dialogRef.open(RegDirIpComponent, {width: 'auto', data, hasBackdrop: false});
    }

    eliminarIp(dir: string): void
    {
        this._teleState.actElimIp(this._instSelectTele._id, this.tipo, dir, '000.000.000.000').subscribe((doc) =>
        {
            if (doc.estatus)
            {
                toastSweet(TipoAlerta.satisfactorio, 'Haz eliminado una direccion IP con exito', 2000);
            }
        });
    }

    nvoIp(): void
    {
        const data: IRegIp =
            {
                _id: this._instSelectTele._id,
                tipo: this._tipo,
                ip: null,
                indice: null,
                esActualizacion: false
            };
        this._dialogRef.open(RegDirIpComponent, {width: 'auto', data, hasBackdrop: false});
    }
}
