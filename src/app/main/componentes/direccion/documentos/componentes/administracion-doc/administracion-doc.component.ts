import {Component, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CrudDocExtComponent} from '../crud-doc-ext/crud-doc-ext.component';

@Component({
    selector: 'app-administracion-doc',
    templateUrl: './administracion-doc.component.html',
    styleUrls: ['./administracion-doc.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AdministracionDocComponent
{
    constructor(private _dialogRef: MatDialog)
    {
    }

    nuevoDocEx(): void
    {
        const data =
            {
                editar: false
            };
        this._dialogRef.open(CrudDocExtComponent, {width: '40%', data, hasBackdrop: false});
    }
}
