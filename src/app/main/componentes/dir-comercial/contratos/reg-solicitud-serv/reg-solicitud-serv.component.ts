import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import tiposPredio from 'assets/organismo/tiposDePredio.json';
import serv from 'assets/organismo/servSolicitado.json';
import t from 'assets/organismo/tarifa.json';
import almacenamiento from 'assets/organismo/almacenamiento.json';
import {validarNum} from '@services/validacionCampos';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {IModalInfo} from '@funcionesRaiz/modal.interface';
import {ICliente} from '@dir-comercial/cliente.interface';
import {botonGuardarConfig} from '@services/botonGuardarConfig';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';
import {IResSolicitud, ISolicitudServ} from '@dir-comercial/solicitudServ.interface';

@Component({
    selector: 'app-reg-solicitud-serv',
    templateUrl: './reg-solicitud-serv.component.html',
    styleUrls: ['./reg-solicitud-serv.component.scss']
})
export class RegSolicitudServComponent implements OnInit
{
    tiposDePredio = tiposPredio;
    servicios = serv;
    tarifas = t;
    alm = almacenamiento;
    opcionesButtonSpinner = botonGuardarConfig();
    nombreCliente: string;

    constructor(private _fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: IModalInfo, private _solicitudServState: SolicitudesState,
                private _dr: MatDialog)
    {
    }

    formSolicitud: FormGroup = this._fb.group({
        calle: ['', RxwebValidators.required({message: 'La calle es requerido'})],
        colonia: ['', RxwebValidators.required({message: 'La colonia es requerido'})],
        entreCalles: [''],
        referencia: [''],
        servSolicitado: ['', RxwebValidators.required({message: 'El tipo de servicio es requerido'})],
        almacenamiento: ['', RxwebValidators.required({message: 'El almacenamiento es requerido'})],
        tipoPredio: ['', RxwebValidators.required({message: 'El predio es requerido'})],
        tarifa: ['', RxwebValidators.required({message: 'La tarifa es requerida'})],
        areaPredio: [0, validarNum(true)],
        areaConstruida: [0, validarNum(true)],
        matArroyoCalle: ['', RxwebValidators.required({message: 'Este campo es requerido'})],
        matAcera: ['', RxwebValidators.required({message: 'Este campo es requerido'})],
        medidorRef: ['']

    });

    ngOnInit(): void
    {
        const servSolicitado = this.data.datos as ICliente;
        if (this.data.esReg)
        {
            this.nombreCliente = servSolicitado.nombreCompleto;
        } else
        {
            this.formSolicitud.patchValue(servSolicitado.contratos);
        }
    }

    regSolicitudServ(): void
    {
        this.opcionesButtonSpinner = botonGuardarConfig(true);
        const modeloContrato: ISolicitudServ =
            {
                aprobadoServ: false,
                ...this.formSolicitud.value
            };
        this._solicitudServState.regSolicitudServ(this.data.datos._id, modeloContrato).subscribe((res: IResSolicitud) =>
        {
            if (res.documento)
            {
                toastSweet(TipoAlerta.satisfactorio, 'Solicitud de servicio creada correctamente', 5000);
            } else
            {
                toastSweet(TipoAlerta.error, 'Ocurrio un error al tratar de crear la solicitud de servicio', 5000);
            }
            this.opcionesButtonSpinner = botonGuardarConfig(false);
            this.cerrarModal();
        }, e => toastSweet(TipoAlerta.error, e, 5000));

        localStorage.setItem(this.data.datos._id, JSON.stringify(modeloContrato));
        toastSweet(TipoAlerta.satisfactorio, 'La solicitud fue guardad de manera exitosa y permanecera de manera local', 5000);
    }

    cerrarModal(): void
    {
        this._dr.closeAll();
    }
}
