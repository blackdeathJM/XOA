import {ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {botonGuardarConfig} from '@services/botonGuardarConfig';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IOrdenTrabajo, IResOrdenTrabajo, TipoAnomalia} from '../../../models/ordenes-trabajo';
import {ICliente, IContrato} from '@dir-comercial/cliente.interface';
import {OrdenesTrabajoState} from '../../../state/ordenes-trabajo.state';
import {SesionState} from '@usuarios/state/sesion.state';
import {Role} from '@modelosUsuarios/usuario.interface';
import moment from 'moment';
import {finalize} from 'rxjs/operators';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';

@Component({
    selector: 'app-reg-orden-area-t',
    templateUrl: './reg-orden-area-t.component.html',
    styleUrls: ['./reg-orden-area-t.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers:
        [
            {
                provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
            }
        ]
})
export class RegOrdenAreaTComponent implements OnDestroy
{
    tipoAnomalia = TipoAnomalia.areaT;
    opcionesButtonSpinner = botonGuardarConfig();
    subscripcion: Subscription = new Subscription();
    modeloOrdenTrabajo: IOrdenTrabajo;
    nombreCompleto: string;

    formDetallesGrales: FormGroup = this._formBuilder.group(
        {detallesGrales: ['', Validators.required]});

    formDetallesUsuario: FormGroup = this._formBuilder.group({
        rpu: ['', [Validators.required]],
        noMedidor: ['', [Validators.required]],
        noContrato: ['', Validators.required],
        calle: ['', Validators.required],
        colonia: ['', Validators.required],
        entreCalles: [''],
        telefonos: [''],
        referencia: ['']
    });
    formAnomalia: FormGroup = this._formBuilder.group({});

    constructor(private _dialogRef: MatDialog, private _formBuilder: FormBuilder, private _ordenTrabajoState: OrdenesTrabajoState,
                private _sesionState: SesionState)
    {
    }

    regOrdenAreaT(): void
    {
        this.opcionesButtonSpinner = botonGuardarConfig(true);
        this.modeloOrdenTrabajo =
            {
                departamentoId: this._sesionState.snapshot.departamentoID,
                tipoOrden: Role.areaTecnica,
                estatus: 'PENDIENTE',
                fechaOrden: moment().toISOString(),
                prioridad: this.formDetallesGrales.value.detallesGrales.prioridad,
                creadaPor: this._sesionState.snapshot.usuario,
                comentarios: this.formDetallesGrales.value.detallesGrales.comentarios,
                anomalia: this.formDetallesGrales.value.detallesGrales.anomalia,
                ordenAreaTecnica:
                    {
                        nombreCompleto: this.nombreCompleto,
                        ...this.formDetallesUsuario.value
                    }
            };

        this._ordenTrabajoState.regOrdenTrabajo(this.modeloOrdenTrabajo).pipe(finalize(() =>
            this.opcionesButtonSpinner = botonGuardarConfig(false))).subscribe((res: IResOrdenTrabajo) =>
        {
            if (res.documento)
            {
                toastSweet(TipoAlerta.satisfactorio, 'Orden de trabajo creada correctamente', 5000);
                this.cerrarModal();
            }
        }, err => toastSweet(TipoAlerta.error, err, 5000));
    }

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }

    clienteSeleccionado(evento: [ICliente, IContrato]): void
    {
        const {nombreCompleto, telefonos} = evento[0];
        this.nombreCompleto = nombreCompleto;
        this.formDetallesUsuario.patchValue({nombreCompleto, telefonos, ...evento[1]});
    }
}
