import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {cargaDeArchivo} from '@shared/components/subidas/archivo-params';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {IDocExt} from '../../models/docExt.interface';
import {FileItem} from 'ng2-file-upload';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';

@Component({
    selector: 'app-reemplazar-docs',
    templateUrl: './reemplazar-docs.component.html',
    styleUrls: ['./reemplazar-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReemplazarDocsComponent implements OnInit
{
    cargarDoc = cargaDeArchivo(true);
    documentos: any[] = [];
    listaElementos: any[] = [];
    progresoTodo = 0;
    elementoCompletado = '';
    documento: IDocExt;

    constructor(@Inject(MAT_DIALOG_DATA) public data: IDocExt, private _dialogRef: MatDialogRef<ReemplazarDocsComponent>)
    {
    }

    ngOnInit(): void
    {
        if (this.data)
        {
            this.documento = this.data;
            this.documentos.push(
                {tipo: 'Reemplazar documento externo', doc: this.data.docUrl, cargando: false},
                {tipo: 'Reemplazar documento de respuesta foliado o documento foliado interno', doc: this.data.docRespUrl, cargando: false},
                {tipo: 'Reemplazar acuse', doc: this.data.acuseUrl, cargando: false});
        }
    }

    subirArchivo(fileInput: HTMLInputElement, elem: string, i: number): void
    {
        const cargando = 'cargando';
        fileInput.click();
        this.cargarDoc.onBeforeUploadItem = antesDeSubir =>
        {
            this.documentos[i][cargando] = true;
            antesDeSubir.file.name = elem;
        };

        this.cargarDoc.onProgressItem = (x: FileItem, y: number) =>
        {
            this.progresoTodo = y;
        };

        this.cargarDoc.onCompleteItem = (elemento: FileItem) =>
        {
            if (elemento.isSuccess)
            {
                this.listaElementos.push(elemento.file.name);
                this.documentos[i][cargando] = false;
                toastSweet(TipoAlerta.satisfactorio, 'Documento reemplazado con exito', 5000);
            } else
            {
                toastSweet(TipoAlerta.error, 'Error al tratar de reemplazar el documento vuelve a intentarlo mas tarde', 5000);
            }
        };
    }
}
