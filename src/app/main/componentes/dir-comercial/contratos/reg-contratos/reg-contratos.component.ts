import {Component, Inject, OnDestroy, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {IContrato} from '@dir-comercial/cliente.interface';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {ClientesState} from '@dir-comercial/clientes.state';
import {IModalInfo} from '@funcionesRaiz/modal.interface';
import {ISolicitudServ} from '@dir-comercial/solicitudServ.interface';
import {finalize} from 'rxjs/operators';
import {SesionState} from '@usuarios/state/sesion.state';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';

@Component({
    selector: 'app-reg-contratos',
    templateUrl: './reg-contratos.component.html',
    styleUrls: ['./reg-contratos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers:
        [
            {
                provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
            }
        ]
})

export class RegContratosComponent implements OnDestroy
{
    estaCargando = false;
    modeloContrato: IContrato;
    sub: Subscription = new Subscription();

    formContrato: FormGroup = this._formBuilder.group({
        ciudad: ['Dolores Hidalgo', RxwebValidators.required()],
        municipio: ['Dolores Hidalgo', RxwebValidators.required()],
        estado: ['Guanajuato', RxwebValidators.required()],
        codigoPostal: ['', RxwebValidators.required()],
        noMedidor: ['', RxwebValidators.required()],
        noCuenta: ['', RxwebValidators.required()],
        sector: [null],
        ruta: [null],
        zona: [null],
        longitud: [0, RxwebValidators.longitude()],
        latitud: [0, RxwebValidators.latitude()]
    });

    constructor(private _formBuilder: FormBuilder, private _clienteState: ClientesState, @Inject(MAT_DIALOG_DATA) private data: IModalInfo,
                private _dialogRef: MatDialog, private _sesionState: SesionState, private _solicitudState: SolicitudesState)
    {
    }

    regContrato(): void
    {
        this.estaCargando = true;
        const {...datos} = this.data.datos as ISolicitudServ;
        const idSolicitud = datos._id;
        delete datos.cliente;
        delete datos._id;
        delete datos['__typename'];

        this.modeloContrato =
            {
                datosSolicitud: datos,
                creadoPor: this._sesionState.snapshot.usuario,
                ...this.formContrato.value
            };
        if (this.data.esReg)
        {
            this.sub.add(this._clienteState.regContrato(datos.idCliente, this.modeloContrato, idSolicitud).pipe(finalize(() =>
            {
                this.estaCargando = false;
                this.cerrarModal();
            })).subscribe());
        }
    }

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }

    ngOnDestroy(): void
    {
        this.sub.unsubscribe();
    }

}
