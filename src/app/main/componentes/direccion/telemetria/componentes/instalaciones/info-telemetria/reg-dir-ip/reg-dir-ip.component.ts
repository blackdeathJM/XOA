import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {botonGuardarConfig} from '@services/botonGuardarConfig';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {IpVersion, RxwebValidators} from '@rxweb/reactive-form-validators';
import {IRegIp} from '@telemetria/telemetria-interface';
import {TelemetriaState} from '@telemetria/telemetriaState';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-reg-dir-ip',
    templateUrl: './reg-dir-ip.component.html',
    styleUrls: ['./reg-dir-ip.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegDirIpComponent implements OnInit, OnDestroy
{
    subscripcion: Subscription = new Subscription();
    opcionesButtonSpinner = botonGuardarConfig(false);
    formEditarIp = this._formBuilder.group({
        ip: ['', [Validators.required, RxwebValidators.ip({version: IpVersion.V4})]]
    });

    constructor(private _formBuilder: FormBuilder, private _dialogRef: MatDialog, @Inject(MAT_DIALOG_DATA) public data: IRegIp,
                private _teleState: TelemetriaState)
    {
    }

    ngOnInit(): void
    {
        if (this.data.esActualizacion)
        {
            this.formEditarIp.patchValue({ip: this.data.ip});
        }
    }

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }

    regEditarIp(): void
    {
        this.opcionesButtonSpinner = botonGuardarConfig(true);
        if (this.data.esActualizacion)
        {
            this.subscripcion.add(this._teleState.actElimIp(this.data._id, this.data.tipo, this.data.ip, this.formEditarIp.get('ip').value).subscribe((doc) =>
            {
                if (doc.estatus)
                {
                    this.opcionesButtonSpinner = botonGuardarConfig(false);
                    toastSweet(TipoAlerta.satisfactorio, doc.mensaje, 5000);
                    this.cerrarModal();
                } else
                {
                    this.opcionesButtonSpinner = botonGuardarConfig(false);
                    toastSweet(TipoAlerta.alerta, doc.mensaje, 5000);
                }
            }));
        } else
        {
            this.subscripcion.add(this._teleState.agIps(this.data._id, this.data.tipo, this.formEditarIp.get('ip').value).subscribe((res) =>
            {
                if (res.estatus)
                {
                    toastSweet(TipoAlerta.satisfactorio, res.mensaje, 5000);
                    this.opcionesButtonSpinner = botonGuardarConfig(false);
                    this.cerrarModal();
                } else
                {
                    this.opcionesButtonSpinner = botonGuardarConfig(false);
                    toastSweet(TipoAlerta.alerta, res.mensaje, 5000);
                }
            }));
        }
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }
}
