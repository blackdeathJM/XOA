import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';
import { IAccionesPrimeTabla, IAncho, IEventoAcciones, IOpcionesCarga } from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import { ITablaColumnas } from '@funcionesRaiz/paginacion-interface';

@Component({
    selector: 'app-prime-tabla',
    templateUrl: './prime-tabla.component.html',
    styleUrls: ['./prime-tabla.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrimeTablaComponent implements OnChanges {
    @Input() set columnas(columnas: ITablaColumnas[]) {
        this._columnas = columnas;
    }

    @Input() set btnAcciones(val: IAccionesPrimeTabla[]) {
        this._btnAcciones = val;
    }

    @Input() set accionesVisibles(val: boolean) {
        this._accionesVisibles = val;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Input() set valConsulta(val: any) {
        if (val) {
            this._valConsulta = val;
        } else {
            this.valConsulta = [];
        }
    }

    @Input() set tipoSeleccion(val: string) {
        this._tipoSeleccion = val;
    }

    @Input() set accDeshPipe(val: string) {
        // acciones deshabilitar boton toma como argumento la accion definida en btbAcciones para habilitar o deshabilitar mediante un pipe
        this._accDeshPipe = val;
    }

    @Input() set accVisPipe(val: string) {
        // acciones ocultar boton toma como argumento la accion definida en btbAcciones para visualizar u ocultar el boton mediante un pipe
        this._accVisPipe = val;
    }

    @Input() set columnsSpan(val: number) {
        this._columnsSpan = val;
    }

    @Input() set ancho(val: IAncho) {
        this._ancho = val;
    }

    @Input() set elemPorPagina(val: number) {
        this._elemPorPagina = val;
    }

    @Input() set skeleton(val: boolean) {
        this._skeleton = val;
    }


    @Input() set opcionesCarga(val: IOpcionesCarga[]) {
        this._opcionesCarga = val;
    }

    @Input() set cargaVisible(val: boolean) {
        this._cargaVisible = val;
    }

    @Input() set columnsSpanCarga(val: number) {
        this._columnsSpanCarga = val;
    }

    @Input() set anchoCarga(val: IAncho) {
        this._anchoCarga = val;
    }

    @Output() emitirAccion = new EventEmitter<IEventoAcciones>();
    // @ViewChild('tb') private tableRef: Table;
    _columnas: ITablaColumnas[] = [];
    _btnAcciones: IAccionesPrimeTabla[] = [];
    _accionesVisibles = false;
    _valConsulta: any = [];
    _tipoSeleccion = 'single';
    _accDeshPipe: string;
    _accVisPipe: string;
    _columnsSpan = 1;
    _ancho: IAncho = { width: 'auto' };
    _elemPorPagina = 15;
    _skeleton = false;
    _cargaVisible = false;
    _columnsSpanCarga = 1;
    _anchoCarga: IAncho = { width: 'auto' };

    _opcionesCarga: IOpcionesCarga[];

    infoSeleccionada(datos: any, accion: string, archivo: string[]): void {
        this.emitirAccion.emit({ accion, datos, archivo });
    }

    ngOnChanges(): void {
        this.emitirAccion.emit({ accion: 'reset', datos: null, archivo: null });
    }
}
