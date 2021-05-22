import {ChangeDetectionStrategy, Component, Input, OnChanges, ViewEncapsulation} from '@angular/core';
import {IInstalacion} from '@telemetria/instalacion-interface';
import {IAccionesPrimeTabla} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {fuseAnimations} from '@plantilla/animations';
import {Ng2ChartService} from '@telemetria/ng2-chart.service';
import {orderBy} from 'lodash-es';
import {IDatasets} from '@funcionesRaiz/graficas';
import {GralesServices} from '@services/grales.service';
import {Chart} from 'chart.js';

@Component({
    selector: 'app-graficar-parametros',
    templateUrl: './graficar-parametros.component.html',
    styleUrls: ['./graficar-parametros.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class GraficarParametrosComponent implements OnChanges
{

    @Input() set instalacionSeleccionada(val: IInstalacion)
    {
        this._instSeleccionada = val;
    }

    @Input() set parametro(val: string)
    {
        this._parametro = val;
    }

    _instSeleccionada: IInstalacion;
    _parametro: string;

    valores: any[] = [];
    graficaParametros: Chart = null;
    ejeX: string[];
    ejeY: IDatasets[] = GralesServices.datasets([], '');

    btnAcciones: IAccionesPrimeTabla[] =
        [
            {
                icono: 'info',
                color: 'primary',
                accion: 'info',
            }
        ];
    columnas: ITablaColumnas[] =
        [
            {
                etiqueta: 'dia',
                propiedad: 'dia'
            },
            {
                etiqueta: 'Mes',
                propiedad: 'mes'
            },
            {
                etiqueta: 'Año',
                propiedad: 'ano'
            },
            {
                etiqueta: 'V1',
                propiedad: 'v1'
            },
            {
                etiqueta: 'V2',
                propiedad: 'v2'
            },
            {
                etiqueta: 'V3',
                propiedad: 'v3'
            },
            {
                etiqueta: 'Prom',
                propiedad: 'promedio'
            }
        ];

    consultar(evento: string): void
    {
        if (this.graficaParametros)
        {
            this.graficaParametros.destroy();
        }

        Ng2ChartService.graficadoSimple(this._instSeleccionada.parametrosElectricos, this._parametro, parseInt(evento, 10), 'ano', 'mes', 'promedio')
            .then(resultado =>
            {
                if (resultado)
                {
                    this.ejeX = resultado[0];
                    this.ejeY[0].label = this._parametro;
                    this.ejeY[0].data = resultado[1];
                    this.graficaParametros = GralesServices.graficar(this._parametro, this.ejeX, this.ejeY);
                }
            }).then(() =>
        {
            this.valores = [];
            if (this._instSeleccionada.parametrosElectricos)
            {
                orderBy(this._instSeleccionada.parametrosElectricos[this._parametro], 'mes', 'asc').forEach(valoresTabla =>
                {
                    if (valoresTabla.ano === parseInt(evento, 10))
                    {
                        this.valores.push(valoresTabla);
                    }
                });
            }
        });
    }

    ngOnChanges(): void
    {
        if (this.graficaParametros)
        {
            this.graficaParametros.destroy();
        }
        this.valores = [];
    }
}
