import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {IMedidor, IMedidorD} from '@telemetria/medidor-interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InstalacionQueryService} from '@telemetria/query/instalacion-query.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {TelemetriaState} from '@telemetria/telemetriaState';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-reg-medidor',
    templateUrl: './reg-medidor.component.html',
    styleUrls: ['./reg-medidor.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegMedidorComponent implements OnInit
{
    estaCargando = false;
    modeloMedidor: IMedidor = {activa: true, fechaInstalacion: '', fechaRetiro: '', medidor: '', recibos: []};
    sub: Subscription = new Subscription();
    formMedidor: FormGroup = this._fb.group({
        medidor: ['', Validators.required],
        fechaInstalacion: ['', Validators.required],
        fechaRetiro: []
    });

    constructor(private _fb: FormBuilder, private _teleState: TelemetriaState, private _instalacionQuery: InstalacionQueryService,
                @Inject(MAT_DIALOG_DATA) public data: IMedidorD, private _dialogRef: MatDialog)
    {
    }

    ngOnInit(): void
    {
        if (this.data.esEditar)
        {
            this.formMedidor.patchValue(this.data.medidor);
        }
    }

    regMedidor(): void
    {
        this.estaCargando = true;
        this.modeloMedidor.medidor = this.formMedidor.get('medidor').value;
        this.modeloMedidor.fechaInstalacion = this.formMedidor.get('fechaInstalacion').value;

        if (this.data.esEditar)
        {
            this.modeloMedidor.fechaRetiro = this.formMedidor.get('fechaRetiro').value;
            if (this.modeloMedidor.fechaRetiro)
            {
                this.sub.add(this._teleState.bajaMedidor(this.data._id, this.modeloMedidor.medidor, this.modeloMedidor.fechaRetiro)
                    .subscribe(v =>
                    {
                        if (v.estatus)
                        {
                            this.estaCargando = false;
                            toastSweet(TipoAlerta.satisfactorio, v.mensaje, 5000);
                            this.cerrarModal();
                        }
                    }));
            } else
            {
                toastSweet(TipoAlerta.alerta, 'No se ha seleccionado fecha de baja', 5000);
                this.estaCargando = false;
            }
        } else
        {
            this.modeloMedidor.fechaInstalacion = '';
            this.sub.add(this._teleState.regMedidor(this.data._id, this.modeloMedidor).subscribe(res =>
            {
                if (res.estatus)
                {
                    this.estaCargando = false;
                    toastSweet(TipoAlerta.satisfactorio, res.mensaje, 5000);
                    this.cerrarModal();
                }
            }));
        }
    }

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }
}
