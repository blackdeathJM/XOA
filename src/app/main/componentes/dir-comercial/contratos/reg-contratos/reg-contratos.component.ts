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
    giros: string[] = ['Casa habitacion', 'Comercio', 'Otros'];

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
                private _dialogRef: MatDialog)
    {
    }

    ngOnDestroy(): void
    {
        throw new Error('Method not implemented.');
    }


    regContrato(): void
    {
        this.estaCargando = true;
        const {...datos} = this.data.datos as ISolicitudServ;
        delete datos.cliente;
        delete datos._id;
        delete datos['__typename'];
        this.modeloContrato =
            {
                datosSolicitud: datos,
                ...this.formContrato.value
            };

        console.log('modelo', this.modeloContrato);
        if (this.data.esReg)
        {
            this.sub.add(this._clienteState.regContrato(datos.idCliente, this.modeloContrato).pipe(finalize(() =>
            {
                this.estaCargando = false;
                this.cerrarModal();
            })).subscribe((res) =>
            {
                if (res.documento)
                {
                    toastSweet(TipoAlerta.satisfactorio, 'El contrato fue realizado con exito', 5000);
                } else
                {
                    toastSweet(TipoAlerta.error, res.mensaje, 5000);
                }
            }, e => toastSweet(TipoAlerta.error, e, 5000)));
        }
    }

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }
}
