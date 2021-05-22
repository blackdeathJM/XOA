import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IDepartamento, IResDepto} from '../models/departamento.model';
import {TipoAlerta} from '@shared/alerts/values.config';
import {botonGuardarConfig} from '@services/botonGuardarConfig';
import {DepartamentoState} from '@global/state/departamento.state';
import {toastSweet} from '@shared/alerts/toasts';

@Component({
    selector: 'app-crud-departamento',
    templateUrl: './crud-departamento.component.html',
    styleUrls: ['./crud-departamento.component.scss']
})
export class CrudDepartamentoComponent implements OnInit
{
    opcionesButtonSpinner = botonGuardarConfig();
    nvoDepartamento: IDepartamento = {
        nombre: '',
        centroGestor: ''
    };
    public formDepto: FormGroup = new FormGroup({
        nombre: new FormControl(null, Validators.required),
        centroGestor: new FormControl(null, Validators.required)
    });

    constructor(public _dialogRef: MatDialog, @Inject(MAT_DIALOG_DATA) public data: IDepartamento,
                private _depto: DepartamentoState)
    {
    }

    ngOnInit(): void
    {
        if (this.data !== null)
        {
            this.formDepto.patchValue(this.data);
        }
    }

    agregarActualizarDepto(): void
    {
        this.opcionesButtonSpinner = botonGuardarConfig(true, 'save', 'Guardando...');
        this.nvoDepartamento.nombre = this.formDepto.get('nombre').value;
        this.nvoDepartamento.centroGestor = this.formDepto.get('centroGestor').value;

        if (this.data === null)
        {
            this._depto.agregarDepto(this.nvoDepartamento).subscribe((res: IResDepto) =>
            {
                console.log('Depto', res);
                this.opcionesButtonSpinner = botonGuardarConfig(false, 'save', 'Guardado');
                toastSweet(TipoAlerta.satisfactorio, 'Departamento guardado con exito', 5000);
                this.cerrarModal();
            });
        } else
        {
            this.nvoDepartamento._id = this.data._id;
            this._depto.actualizarDepto(this.nvoDepartamento).subscribe(() =>
            {
                this.opcionesButtonSpinner = botonGuardarConfig(false, 'save', 'Guardado');
                toastSweet(TipoAlerta.satisfactorio, 'Departamento actualizado con exito', 5000);
                this.cerrarModal();
            });
        }
    }

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }
}
