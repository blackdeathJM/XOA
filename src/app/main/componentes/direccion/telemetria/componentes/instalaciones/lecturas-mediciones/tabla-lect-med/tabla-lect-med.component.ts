import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {IInstalacion} from '@telemetria/instalacion-interface';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {IAccionesPrimeTabla, IEventoAcciones} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {forEach} from 'lodash-es';

@Component({
    selector: 'app-tabla-lect-med',
    templateUrl: './tabla-lect-med.component.html',
    styleUrls: ['./tabla-lect-med.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablaLectMedComponent implements OnChanges
{

    @Input() set lecturaTipo(val: string)
    {
        this._lecturaTipo = val;
    }

    @Input() set instalacionSeleccionada(val: IInstalacion)
    {
        this._instalacionSeleccionada = val;
    }

    @Output() emitirAccion = new EventEmitter<IEventoAcciones>();
    // Tabla
    columnas: ITablaColumnas[] = [];
    valoresTabla: any = [];
    btnAcciones: IAccionesPrimeTabla[] = [];

    _lecturaTipo: string;
    _instalacionSeleccionada: IInstalacion;

    lecturaMensual(lecturaTipo: string): void
    {
        this.valoresTabla = [];
        this.columnas = [];
        this.columnas = [
            {
                etiqueta: 'Año',
                propiedad: 'ano',

            },
            {
                etiqueta: 'Enero',
                propiedad: 'ene',

            },
            {
                etiqueta: 'Febrero',
                propiedad: 'feb',

            },
            {
                etiqueta: 'Marzo',
                propiedad: 'mar',

            },
            {
                etiqueta: 'Abril',
                propiedad: 'abr',

            },
            {
                etiqueta: 'Mayo',
                propiedad: 'may',

            },
            {
                etiqueta: 'Junio',
                propiedad: 'jun',

            },
            {
                etiqueta: 'Julio',
                propiedad: 'jul',

            },
            {
                etiqueta: 'Agosto',
                propiedad: 'ago',

            },
            {
                etiqueta: 'Septiembre',
                propiedad: 'sep',

            },
            {
                etiqueta: 'Octubre',
                propiedad: 'oct',

            },
            {
                etiqueta: 'Noviembre',
                propiedad: 'nov',

            },
            {
                etiqueta: 'Diciembre',
                propiedad: 'dic',

            },
            {
                etiqueta: 'Total',
                propiedad: 'total',
            }
        ];
        this.btnAcciones = this.accionesBoton();
        this.valoresTabla = this.instalacionSeleccionada.lecturas[lecturaTipo];
    }

    lecturaBimestral(lecturaTipo: string): void
    {
        this.valoresTabla = [];
        this.columnas = [];
        this.columnas = [
            {
                etiqueta: 'Ano',
                propiedad: 'ano',
            },
            {
                etiqueta: 'Ene - Feb',
                propiedad: 'ene - feb',
            },
            {
                etiqueta: 'Mar - Abr',
                propiedad: 'mar - abr',
            },
            {
                etiqueta: 'May - Jun',
                propiedad: 'may - jun',
            },
            {
                etiqueta: 'Jul - Ago',
                propiedad: 'jul - ago',
            },
            {
                etiqueta: 'Sep - Oct',
                propiedad: 'sep - oct',
            },
            {
                etiqueta: 'Nov - Dic',
                propiedad: 'nov - dic',
            },
            {
                etiqueta: 'Total',
                propiedad: 'total',
            }
        ];
        this.btnAcciones = this.accionesBoton();
        forEach(this.instalacionSeleccionada.lecturas[lecturaTipo], x =>
        {
            this.valoresTabla.push(
                {
                    ano: x.ano,
                    'ene - feb': x.ene + x.feb,
                    'mar - abr': x.mar + x.abr,
                    'may - jun': x.may + x.jun,
                    'jul - ago': x.jul + x.ago,
                    'sep - oct': x.sep + x.oct,
                    'nov - dic': x.nov + x.dic,
                    total: x.total
                });
        });
    }

    lecturaTrimestral(lecturaTipo: string): void
    {
        this.valoresTabla = [];
        this.columnas = [];
        this.columnas = [
            {
                etiqueta: 'Ano',
                propiedad: 'ano',
            },
            {
                etiqueta: 'Ene - Feb - Mar',
                propiedad: 'ene - feb - mar',
            },
            {
                etiqueta: 'Abr - May - Jun',
                propiedad: 'abr - may - jun',
            },
            {
                etiqueta: 'Jul - Ago - Sep',
                propiedad: 'jul - ago - sep',
            },
            {
                etiqueta: 'Oct - nov - Dic',
                propiedad: 'oct - nov - dic',
            },
            {
                etiqueta: 'Total',
                propiedad: 'total',
            }
        ];
        this.btnAcciones = this.accionesBoton();

        forEach(this.instalacionSeleccionada.lecturas[lecturaTipo], x =>
        {
            this.valoresTabla.push(
                {
                    ano: x.ano,
                    'ene - feb - mar': x.ene + x.feb + x.mar,
                    'abr - may - jun': x.abr + x.may + x.jun,
                    'jul - ago - sep': x.jul + x.ago + x.sep,
                    'oct - nov - dic': x.oct + x.nov + x.dic,
                    total: x.total
                });
        });
    }

    valoresRecibidos(evento: IEventoAcciones): void
    {
        this.emitirAccion.emit(evento);
    }

    ngOnChanges(): void
    {
        this.columnas = [];
        this.btnAcciones = [];
    }

    accionesBoton(): IAccionesPrimeTabla[]
    {
        return [
            {
                accion: 'info',
                color: 'primary',
                icono: 'bar_chart'
            },
            {
                accion: 'editar',
                color: 'primary',
                icono: 'edit'
            }
        ];
    }
}
