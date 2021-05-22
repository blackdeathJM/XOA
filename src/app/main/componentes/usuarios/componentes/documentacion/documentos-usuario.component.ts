import {Component, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RegistroFolioComponent} from './registro-folio/registro-folio.component';

@Component({
    selector: 'app-documentos-usuario',
    templateUrl: './documentos-usuario.component.html',
    styleUrls: ['./documentos-usuario.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DocumentosUsuarioComponent
{
    constructor(private _dialogRef: MatDialog)
    {

    }

    generarNvoFolio(): void
    {
        this._dialogRef.open(RegistroFolioComponent, {width: '45%'});
    }
}
