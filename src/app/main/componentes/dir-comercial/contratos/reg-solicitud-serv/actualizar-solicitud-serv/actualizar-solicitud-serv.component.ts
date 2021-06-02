import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {botonGuardarConfig} from '@services/botonGuardarConfig';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IModalInfo} from '@funcionesRaiz/modal.interface';

@Component({
    selector: 'app-actualizar-solicitud-serv',
    templateUrl: './actualizar-solicitud-serv.component.html',
    styleUrls: ['./actualizar-solicitud-serv.component.scss']
})
export class ActualizarSolicitudServComponent implements OnInit
{
    opcionesButtonSpinner = botonGuardarConfig();
    formActSolitudServ: FormGroup = this._fb.group({
        observaciones: ['', RxwebValidators.required({message: 'Este Campo es requerido'})],
        aprobadoServ: [null, RxwebValidators.required({message: 'Selecciona si el servicio fue aprobado'})],
        ejecutadaPor: ['', RxwebValidators.required({message: 'Registra la persona que realizo la solicitud'})]
    });

    constructor(private _fb: FormBuilder, private _solicitudState: SolicitudesState, @Inject(MAT_DIALOG_DATA) private data: IModalInfo)
    {
    }

    ngOnInit(): void
    {

    }

    actSolicitud(): void
    {

    }
}
