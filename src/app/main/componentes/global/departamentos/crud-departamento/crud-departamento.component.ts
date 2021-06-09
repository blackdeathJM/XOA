import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IDepartamento, IResDepto} from '../models/departamento.model';
import {TipoAlerta} from '@shared/alerts/values.config';
import {DepartamentoState} from '@global/state/departamento.state';
import {toastSweet} from '@shared/alerts/toasts';

@Component({
    selector: 'app-crud-departamento',
    templateUrl: './crud-departamento.component.html',
    styleUrls: ['./crud-departamento.component.scss']
})
export class CrudDepartamentoComponent implements OnInit
{
    cargandoDatos = false;

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

    cerrarModal(): void
    {
        this._dialogRef.closeAll();
    }

    registro(): void
    {
        this.cargandoDatos = true;
        this.nvoDepartamento.nombre = this.formDepto.get('nombre').value;
        this.nvoDepartamento.centroGestor = this.formDepto.get('centroGestor').value;

        if (this.data === null)
        {
            this._depto.agregarDepto(this.nvoDepartamento).subscribe((res: IResDepto) =>
            {
                this.cargandoDatos = false;
                toastSweet(TipoAlerta.satisfactorio, 'Departamento guardado con exito', 5000);
                this.cerrarModal();
            });
        } else
        {
            this.nvoDepartamento._id = this.data._id;
            this._depto.actualizarDepto(this.nvoDepartamento).subscribe(() =>
            {
                this.cargandoDatos = false;
                toastSweet(TipoAlerta.satisfactorio, 'Departamento actualizado con exito', 5000);
                this.cerrarModal();
            });
        }
    }

    cancelar(): void
    {
        this.cerrarModal();
    }
}
