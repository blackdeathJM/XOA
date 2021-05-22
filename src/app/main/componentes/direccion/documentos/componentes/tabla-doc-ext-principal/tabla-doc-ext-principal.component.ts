import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {IDocExt} from '../../models/docExt.interface';
import {MatDialog} from '@angular/material/dialog';
import {CrudDocExtComponent} from '../crud-doc-ext/crud-doc-ext.component';
import {DocsState} from '../../state/docs.state';
import {ProcesosDoc} from '@Config/enums';
import {Subscription} from 'rxjs';
import {ReemplazarDocsComponent} from '../reemplazar-docs/reemplazar-docs.component';
import {IWidget} from '@Config/widget.interface';
import {WIDGET} from '@Config/widget.token';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';

@Component({
    selector: 'app-tabla-doc-ext-principal',
    templateUrl: './tabla-doc-ext-principal.component.html',
    styleUrls: ['./tabla-doc-ext-principal.component.scss'],
    providers:
        [
            {
                provide: WIDGET,
                useExisting: TablaDocExtPrincipalComponent
            }
        ]
})
export class TablaDocExtPrincipalComponent implements OnInit, OnDestroy, IWidget, OnChanges
{
    subDocs: Subscription;
    estaCargando = false;
    tieneDatos = true;
    totalElementos: number;
    p = 1;

    constructor(public _docsState: DocsState, private _dialogRef: MatDialog)
    {

    }

    ngOnInit(): void
    {
        this.estaCargando = true;
        this.subDocs = this._docsState.listarDocumentos(ProcesosDoc.entregado).subscribe((docs) =>
        {
            if (docs.documentos.length > 0)
            {
                this.totalElementos = docs.documentos.length;
                this.estaCargando = false;
            } else
            {
                this.tieneDatos = false;
            }
        }, error => toastSweet(TipoAlerta.error, 'Error al cargar la informacion: ' + error, 5000));
    }

    darPorTerminadoDoc(_id: string): void
    {
        this._docsState.terminarDoc(_id);
    }

    editarInfo(documento: IDocExt): void
    {
        const data =
            {
                editar: true,
                documento
            };
        this._dialogRef.open(CrudDocExtComponent, {width: '45%', data, hasBackdrop: false});
    }

    evitarExpandir($event: MouseEvent): void
    {
        $event.stopPropagation();
    }

    ngOnDestroy(): void
    {
        this.subDocs.unsubscribe();
    }

    reemplazarDocs(data: IDocExt): void
    {
        this._dialogRef.open(ReemplazarDocsComponent, {width: '40%', hasBackdrop: false, data});
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        console.log('cambios', changes);
    }
}
