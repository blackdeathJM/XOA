import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CrudDepartamentoComponent} from './crud-departamento/crud-departamento.component';
import {IDepartamento} from './models/departamento.model';
import {fuseAnimations} from '@plantilla/animations';
import {DepartamentoState} from '@global/state/departamento.state';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-departamentos',
    templateUrl: './departamentos.component.html',
    styleUrls: ['./departamentos.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class DepartamentosComponent implements OnInit, OnDestroy
{
    subDeptos: Subscription;

    constructor(private _dialogRef: MatDialog, public _deptos: DepartamentoState)
    {
    }

    nvoDepto(): void
    {
        this._dialogRef.open(CrudDepartamentoComponent, {width: '40%', data: null});
    }

    datoSeleccionado(departamento: IDepartamento): void
    {
        this._dialogRef.open(CrudDepartamentoComponent, {width: '40%', data: departamento});
    }

    ngOnInit(): void
    {
        this.subDeptos = this._deptos.listaDeptos().subscribe();
    }

    ngOnDestroy(): void
    {
        this.subDeptos.unsubscribe();
    }
}
