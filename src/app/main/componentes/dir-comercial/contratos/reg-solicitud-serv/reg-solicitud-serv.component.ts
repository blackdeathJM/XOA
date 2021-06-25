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
import {SolicitudesState} from '@dir-comercial/solicitudes.state';
import {IResSolicitud, ISolicitudServ} from '@dir-comercial/solicitudServ.interface';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';

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
    estaCargando = false;
    nombreCliente: string;

    constructor(private _fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private data: IModalInfo, private _solicitudServState: SolicitudesState,
                private _dr: MatDialog)
    {
    }

    formSolicitud: FormGroup = this._fb.group({
        calle: ['', RxwebValidators.required({message: 'La calle es requerido'})],
        colonia: ['', RxwebValidators.required({message: 'La colonia es requerido'})],
        noPersonas: [0, validarNum(false, null, null, {value: 20})],
        entreCalles: [''],
        referencia: [''],
        observaciones: [''],
        areaPredio: [0, validarNum(true)],
        areaConstruida: [0, validarNum(true)],
        matArroyoCalle: ['', RxwebValidators.required({message: 'Este campo es requerido'})],
        matAcera: ['', RxwebValidators.required({message: 'Este campo es requerido'})],
        medidorRef: ['']
    });

    formDatosTecnicos: FormGroup = this._fb.group({
        servSolicitado: ['', RxwebValidators.required({message: 'El tipo de servicio es requerido'})],
        almacenamiento: ['', RxwebValidators.required({message: 'El almacenamiento es requerido'})],
        tipoPredio: ['', RxwebValidators.required({message: 'El predio es requerido'})],
        tarifa: ['', RxwebValidators.required({message: 'La tarifa es requerida'})],
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
        this.estaCargando = true;
        const modSolicitudServ: ISolicitudServ =
            {
                idCliente: this.data.datos._id,
                pagoServRealizado: false,
                ...this.formSolicitud.value,
                ...this.formDatosTecnicos.value
            };

        this._solicitudServState.regSolicitudServ(modSolicitudServ).subscribe((res: IResSolicitud) =>
        {
            if (res.documento)
            {
                toastSweet(TipoAlerta.satisfactorio, 'Solicitud de servicio creada correctamente', 5000);
            } else
            {
                toastSweet(TipoAlerta.error, 'Ocurrio un error al tratar de crear la solicitud de servicio', 5000);
            }
            this.estaCargando = false;
            this.cerrarModal();
        });
    }

    cerrarModal(): void
    {
        this._dr.closeAll();
    }
}
