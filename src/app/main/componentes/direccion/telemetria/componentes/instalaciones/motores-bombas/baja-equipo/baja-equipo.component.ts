import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2/dist/sweetalert2';
import {TelemetriaState} from '@telemetria/telemetriaState';
import moment from 'moment';
import {IBajaEquipo} from '@telemetria/equipo-electrico-interface';

@Component({
    selector: 'app-baja-equipo',
    templateUrl: './baja-equipo.component.html',
    styleUrls: ['./baja-equipo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BajaEquipoComponent
{
    estaCargando = false;
    formFecha: FormGroup = this._fb.group({
        fecha: [null, Validators.required],
        motivoRetiro: [null, Validators.required]
    });

    constructor(private _fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: IBajaEquipo, private _dialogRef: MatDialog,
                private teleState: TelemetriaState)
    {
    }

    baja(): void
    {
        this.estaCargando = true;
        Swal.fire({
            title: 'Baja equipo',
            text: `Confirma que deseas dar de baja este ${this.data.equipo}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            customClass: 'swal-text',
            confirmButtonText: 'Si, dar de baja'
        }).then((result) =>
        {
            if (result.value)
            {
                this.teleState.bajaEquipo(this.data._id, this.data.id, moment(this.formFecha.value.fecha).toISOString(), this.data.equipo,
                    this.formFecha.value.motivoRetiro)
                    .subscribe(m =>
                    {
                        if (m.estatus)
                        {
                            this.estaCargando = false;
                            Swal.fire(
                                {
                                    title: 'Baja correcta',
                                    text: m.mensaje,
                                    icon: 'success',
                                    customClass: 'swal-text'
                                });
                            this.cerrarModal();
                        }
                    });
            }
        });
    }

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }
}
