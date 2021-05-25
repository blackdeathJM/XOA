import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {botonGuardarConfig} from '@services/botonGuardarConfig';
import {FormBuilder, FormGroup} from '@angular/forms';
import {validarNum} from '@services/validacionCampos';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {IClienteMod, IContrato} from '@dir-comercial/cliente.interface';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {ClientesState} from '@dir-comercial/clientes.state';
import tarifa from 'assets/organismo/tarifa.json';

interface ITarifa
{
    tarifa: string;
}

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

export class RegContratosComponent implements OnInit
{
    opcionesButtonSpinner = botonGuardarConfig();
    modeloContrato: IContrato;
    sub: Subscription = new Subscription();
    tarifas: ITarifa[] = tarifa;
    giros: string[] = ['Casa habitacion', 'Comercio', 'Otros'];

    formDatosGrales: FormGroup = this._formBuilder.group({
        noFamiliasEnToma: ['', validarNum(false, null, null, {value: 20})],
        calle: ['', [RxwebValidators.required()]],
        colonia: ['', [RxwebValidators.required()]],
        entreCalles: [''],
        referencia: [''],
        ciudad: ['', RxwebValidators.required()],
        municipio: ['', RxwebValidators.required()],
        estado: ['', RxwebValidators.required()],
        codigoPostal: ['', RxwebValidators.required()],
    });
    formContrato: FormGroup = this._formBuilder.group({
        noContrato: ['', validarNum(false)],
        noMedidor: [''],
        noCuenta: ['', RxwebValidators.required()],
        sector: ['', validarNum(false)],
        ruta: ['', validarNum(false)],
        tarifa: ['', [RxwebValidators.required()]],
        giro: ['', [RxwebValidators.required()]],
        zona: ['', [RxwebValidators.required()]]
    });

    constructor(private _formBuilder: FormBuilder, private _clienteState: ClientesState, @Inject(MAT_DIALOG_DATA) private data: IClienteMod,
                private _dialogRef: MatDialog)
    {
    }

    ngOnInit(): void
    {
        console.log('tarifas', tarifa);
    }

    regContrato(): void
    {
        this.opcionesButtonSpinner = botonGuardarConfig(true);
        this.modeloContrato = Object.assign(this.formDatosGrales.value, this.formContrato.value);

        if (this.data.esRegistro)
        {
            // this.sub.add(this._clienteState.regContrato(this.data.datosCliente._id, this.modeloContrato).pipe(finalize(() =>
            // {
            //     this.opcionesButtonSpinner = botonGuardarConfig(false);
            //     this.cerrarModal();
            // })).subscribe((res) =>
            // {
            //     if (res.documento)
            //     {
            //         toastSweet(TipoAlerta.satisfactorio, 'El contrato fue realizado con exito', 5000);
            //     } else
            //     {
            //         toastSweet(TipoAlerta.error, res.mensaje, 5000);
            //     }
            // }, e => toastSweet(TipoAlerta.error, e, 5000)));
        }
    }

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }
}
