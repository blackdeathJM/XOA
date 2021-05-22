import {Component, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {IInstalacion} from '@telemetria/instalacion-interface';
import {fuseAnimations} from '@plantilla/animations';
import {eTiposLect, ILecturas, IParamsMediciones} from '@telemetria/lecturas-interface';
import {IEventoAcciones} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {MatDialog} from '@angular/material/dialog';
import {RegMedicionComponent} from '@telemetria/instalaciones/lecturas-mediciones/reg-medicion/reg-medicion.component';
import {Chart, registerables} from 'chart.js';
import {GralesServices} from '@services/grales.service';
import {IDatasets} from '@funcionesRaiz/graficas';

Chart.register(...registerables);

// import Chart from 'chart.js/auto';
@Component({
    selector: 'app-grafica-lect-medicion',
    templateUrl: './grafica-lect-medicion.component.html',
    styleUrls: ['./grafica-lect-medicion.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class GraficaLectMedicionComponent implements OnChanges
{
    @Input() instSelec: IInstalacion;
    deshabilitarBtn = true;
    parametros = '';
    // Valores asignados en el OnChanges que son los atributos de las lecturas
    tiposLect: string[] = [];

    ctx = 'grafLecMed';
    ejeX: string[];
    ejeY: IDatasets[] = GralesServices.datasets([], '');
    grafica: Chart = null;

    constructor(private _dialogRef: MatDialog)
    {

    }

    async graficaAnual(): Promise<void>
    {
        if (this.grafica)
        {
            this.grafica.destroy();
        }

        this.ejeX = [];
        this.ejeY[0].data = [];

        for await (const v of this.instSelec.lecturas[this.parametros])
        {
            this.ejeX.push(v.ano);
            this.ejeY[0].data.push(v.total);
        }

        this.grafica = GralesServices.graficar(this.ctx, this.ejeX, this.ejeY);
    }

    graficas(evento: ILecturas): void
    {
        if (this.grafica)
        {
            this.grafica.destroy();
        }
        const nombreTipo = '__typename';
        const grafLecMed = {...evento};
        delete grafLecMed.total;
        delete grafLecMed.ano;
        delete grafLecMed[nombreTipo];

        this.ejeX = Object.keys(grafLecMed);
        this.ejeY[0].data = Object.values(grafLecMed);
        this.ejeY[0].label = 'Graficado de mediciones';

        this.grafica = GralesServices.graficar(this.ctx, this.ejeX, this.ejeY);
    }

    recibirDatos(evento: IEventoAcciones, tipoLect: string, instSele: IInstalacion): void
    {
        switch (evento.accion)
        {
            case 'info':
                this.parametros = tipoLect;
                this.deshabilitarBtn = false;
                this.graficas(evento.datos);
                break;
            case 'editar':
                let sufijo: string;
                switch (tipoLect)
                {
                    case eTiposLect.macro:
                        sufijo = 'mts3';
                        break;
                    case eTiposLect.cfe:
                        sufijo = 'Kw';
                        break;
                    case eTiposLect.nivelE:
                        sufijo = 'mts';
                        break;
                    case eTiposLect.nivelD:
                        sufijo = 'mts';
                        break;
                }

                const data: IParamsMediciones =
                    {
                        datos: evento.datos,
                        esAgregar: false,
                        valorMax: {value: 5000},
                        tipoLect,
                        sufijo,
                        _id: instSele._id
                    };
                this._dialogRef.open(RegMedicionComponent, {width: 'auto', data, hasBackdrop: false});
                break;
            case 'rest':
                break;
        }
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        if (changes.instSelec.currentValue.lecturas !== undefined && changes.instSelec.currentValue.lecturas !== null)
        {
            this.tiposLect = Object.keys(this.instSelec.lecturas);
            const indice = this.tiposLect.indexOf('__typename');
            if (indice > -1)
            {
                this.tiposLect.splice(indice, 1);
            }
        } else
        {
            this.tiposLect = [];
        }
    }
}
