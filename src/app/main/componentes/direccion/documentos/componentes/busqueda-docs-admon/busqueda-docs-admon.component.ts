import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, OnDestroy, ViewEncapsulation} from '@angular/core';
import {DocsState} from '../../state/docs.state';
import {ProcesosDoc} from '@Config/enums';
import {WIDGET} from '@Config/widget.token';
import {IWidget} from '@Config/widget.interface';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {IDocExt} from '../../models/docExt.interface';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-busqueda-docs-admon',
    templateUrl: './busqueda-docs-admon.component.html',
    styleUrls: ['./busqueda-docs-admon.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusquedaDocsAdmonComponent implements OnDestroy
{
    @ContentChild(WIDGET, {static: true}) widget: IWidget;
    textoError = 'Error inesperado: ';
    subscripcion: Subscription = new Subscription();

    constructor(private docsState: DocsState, private _cd: ChangeDetectorRef)
    {
    }

    rangoFechas(evento: string[]): void
    {
        this.widget.tieneDatos = true;
        this.widget.estaCargando = true;
        this.subscripcion.add(this.docsState.busquedaEntreFechas(evento).subscribe((docs) =>
        {
            this.datosObtenidos(docs.documentos);
        }, error =>
        {
            toastSweet(TipoAlerta.error, this.textoError + error, 5000);
        }));
    }

    buscarDocsPendientes(): void
    {
        this.widget.tieneDatos = true;
        this.widget.estaCargando = true;
        this.subscripcion.add(this.docsState.consultarDocsPorProceso(ProcesosDoc.pendiente).subscribe((docs) =>
        {
            this.datosObtenidos(docs.documentos);
        }, error =>
        {
            toastSweet(TipoAlerta.error, this.textoError + error, 5000);
        }));
    }

    busquedaGral(evento: string): void
    {
        this.widget.tieneDatos = true;
        this.widget.estaCargando = true;
        this.subscripcion.add(this.docsState.busquedaGral(evento).subscribe((docs) =>
        {
            this.datosObtenidos(docs.documentos);
        }, error =>
        {
            toastSweet(TipoAlerta.error, this.textoError + error, 3000);
        }));
    }

    busquedaPorUsuario(evento: string[]): void
    {
        this.widget.tieneDatos = true;
        this.widget.estaCargando = true;
        this.subscripcion.add(this.docsState.busquedaPorUsuario(evento.toString()).subscribe((docs) =>
        {
            this.datosObtenidos(docs.documentos);
        }, error =>
        {
            toastSweet(TipoAlerta.error, this.textoError + error, 5000);
        }));
    }

    cambio(evento: string): void
    {
        this.widget.tieneDatos = true;
        this.widget.estaCargando = true;
        switch (evento)
        {
            case 'pendientes':
                this.subscripcion.add(this.docsState.listarDocsPen().subscribe((docs) =>
                {
                    this.datosObtenidos(docs.documentos);
                }, error =>
                {
                    toastSweet(TipoAlerta.error, this.textoError + error, 5000);
                }));
                break;
            case 'finalizados':
                this.subscripcion.add(this.docsState.consultarDocsPorProceso(ProcesosDoc.entregado).subscribe((docs) =>
                {
                    this.datosObtenidos(docs.documentos);
                }));
                break;
            case 'todos':
                this.subscripcion.add(this.docsState.todosLosDocs().subscribe((docs) =>
                {
                    this.datosObtenidos(docs.documentos);
                }, error =>
                {
                    toastSweet(TipoAlerta.error, this.textoError + error, 5000);

                }));
                break;
            default:
                this.subscripcion.add(this.docsState.docPorTipo(evento).subscribe((docs) =>
                {
                    this.datosObtenidos(docs.documentos);
                }, error =>
                {
                    toastSweet(TipoAlerta.error, this.textoError + error, 5000);
                }));
                break;
        }
    }

    esInterno(interno: boolean): void
    {
        this.widget.tieneDatos = true;
        this.widget.estaCargando = true;
        this.subscripcion.add(this.docsState.intOExt(interno).subscribe((docs) =>
        {
            this.datosObtenidos(docs.documentos);
            this._cd.markForCheck();
        }, error =>
        {
            toastSweet(TipoAlerta.error, this.textoError + error, 5000);
        }));
    }

    ultimoFolio(): void
    {
        this.widget.tieneDatos = true;
        this.widget.estaCargando = true;
        this.subscripcion.add(this.docsState.ultimoFolio().subscribe((docs) =>
        {
            this.datosObtenidos(docs.documentos);
            this._cd.markForCheck();
        }));
    }

    datosObtenidos(documentos: IDocExt[]): void
    {
        if (documentos.length > 0)
        {
            this.widget.totalElementos = documentos.length;
            this.widget.estaCargando = false;
        } else
        {
            this.widget.tieneDatos = false;
        }
        this._cd.markForCheck();
    }

    ngOnDestroy(): void
    {
        this.subscripcion.unsubscribe();
    }
}
