import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import moment from 'moment';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IOrdenTrabajo, IResOrdenTrabajo, TipoAnomalia} from '../../../models/ordenes-trabajo';
import {TelemetriaState} from '@telemetria/telemetriaState';
import {Role} from '@modelosUsuarios/usuario.interface';
import {SesionState} from '@usuarios/state/sesion.state';
import {OrdenesTrabajoState} from '../../../state/ordenes-trabajo.state';
import {map, tap} from 'rxjs/operators';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {MatDialog} from '@angular/material/dialog';
import {DepartamentoState} from '@global/state/departamento.state';
import {IDepartamento, IResDepto} from '@global/models/departamento.model';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
    selector: 'app-reg-orden-trab-tele',
    templateUrl: './reg-orden-trab-tele.component.html',
    styleUrls: ['./reg-orden-trab-tele.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers:
        [
            {
                provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
            }
        ]
})
export class RegOrdenTrabTeleComponent implements OnInit
{
    fecha = moment().toISOString();
    tipoAnomalia = TipoAnomalia.tele;
    estaCargando = false;
    subscripcion: Subscription = new Subscription();
    departamentoId: IDepartamento[] = [{_id: '', nombre: '', centroGestor: ''}];
    modeloOrdenTele: IOrdenTrabajo;

    formDetallesGrales: FormGroup = this._formBuilder.group(
        {detallesGrales: ['', Validators.required]});

    formordenTelemetria: FormGroup = this._formBuilder.group(
        {
            instalacion: ['', Validators.required]
        }
    );

    constructor(private _formBuilder: FormBuilder, public _teleState: TelemetriaState, private _sesionUsuario: SesionState, private _ordenTrabsajoTele: OrdenesTrabajoState,
                private _dialogRef: MatDialog, private _deptoState: DepartamentoState)
    {
    }

    ngOnInit(): void
    {
        this.subscripcion.add(this._deptoState.listaDeptos().pipe(map((res: IResDepto) =>
        {
            this.departamentoId = res.documentos.filter(value => value.nombre.includes('Telemetria'));
        })).subscribe());
    }

    regOrdenTele(): void
    {
        if (this.departamentoId)
        {
            this.estaCargando = true;
            this.modeloOrdenTele =
                {
                    fechaEjecucion: null,
                    ejecutadaPor: null,
                    observaciones: '',
                    ordenAtencion: '',
                    estatus: 'PENDIENTE',
                    tipoOrden: Role.telemetria,
                    anomalia: this.formDetallesGrales.value.detallesGrales.anomalia,
                    comentarios: this.formDetallesGrales.value.detallesGrales.comentarios,
                    prioridad: this.formDetallesGrales.value.detallesGrales.prioridad,
                    creadaPor: this._sesionUsuario.snapshot.usuario,
                    departamentoId: this.departamentoId[0]._id,
                    fechaOrden: this.fecha,
                    ordenTelemetria:
                        {
                            instalacion: this.formordenTelemetria.get('instalacion').value
                        }
                };
            this.subscripcion.add(this._ordenTrabsajoTele.regOrdenTrabajo(this.modeloOrdenTele).pipe(tap((res: IResOrdenTrabajo) =>
            {
                if (res.estatus)
                {
                    toastSweet(TipoAlerta.satisfactorio, res.mensaje, 5000);
                    this.estaCargando = false;
                    this.cerrarModal();
                } else
                {
                    this.estaCargando = false;
                    toastSweet(TipoAlerta.error, res.mensaje, 5000);
                    this.cerrarModal();
                }
            })).subscribe());
        } else
        {
            toastSweet(TipoAlerta.alerta, 'no hay departamento seleccionado', 5000);
            this.estaCargando = false;
        }
    }

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }
}
