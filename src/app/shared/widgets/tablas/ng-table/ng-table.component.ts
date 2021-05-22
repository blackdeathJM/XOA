import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DocumentNode} from 'graphql';
import {IInfoPaginacion, IResPropiedadesTabla, ITablaColumnas} from 'app/main/interfaces/paginacion-interface';
import {Observable} from 'rxjs';
import {TablaPaginacionService} from '@services/tabla-paginacion.service';
import {map} from 'rxjs/operators';
import {IAccionesPrimeTabla} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {PARAMETROS_PIPE} from '@shared/widgets/tablas/ng-table/models/t-ng-tabla-interface';

@Component({
    selector: 'app-ng-table',
    templateUrl: './ng-table.component.html',
    styleUrls: ['./ng-table.component.scss']
})
export class NgTableComponent implements OnInit
{
    @Input() query: DocumentNode;
    @Input() context = {};
    @Input() variables = {};
    @Input() _pluck: Array<string>;

    @Input() accionesVisibles: boolean;
    @Input() btnAcciones: IAccionesPrimeTabla[];
    @Input() accDeshabilitarPipie: PARAMETROS_PIPE;
    @Input() accVisiblePipe: PARAMETROS_PIPE;
    @Input() resultadoDatos: IResPropiedadesTabla;
    @Input() columnas: Array<ITablaColumnas> = undefined;

    @Output() emitirDatos = new EventEmitter<object[]>();

    infoPagina: IInfoPaginacion;
    documentos$: Observable<any>;

    constructor(private _tablaPaginacionService: TablaPaginacionService)
    {

    }

    ngOnInit(): void
    {
        setTimeout(() =>
        {
            if (this.query === undefined)
            {
                throw new Error('Consulta indefinida');
            }
            if (this.resultadoDatos === undefined)
            {
                throw new Error('Resultado datos indefinido');
            }
            if (this.columnas === undefined)
            {
                throw new Error('Las columnas son indefinidas');
            }
            this.cargarDatos();
        }, 1000);

        this.infoPagina =
            {
                elementosPorPagina: this.variables['elementosPorPagina'],
                pagina: 1,
                paginas: 0,
                total: 0
            };
    }

    cargarDatos(): void
    {
        this.documentos$ = this._tablaPaginacionService.obtenerListaDocumentos(this.query, this.variables, {}, this._pluck).pipe(
            map((resultado: any) =>
            {
                this.infoPagina.paginas = resultado.info.paginas;
                this.infoPagina.total = resultado.info.total;
                return resultado[this.resultadoDatos.llaveLista];
            })
        );
    }

    cambioPagina(evento: number): Promise<number>
    {
        return new Promise<number>(resolve =>
        {
            resolve(evento);
            this.variables['pagina'] = evento;
            this.cargarDatos();
        });
    }

    infoSeleccionada(dato: any, accion: string): void
    {
        console.log('ngTable', dato, accion);
    }
}
