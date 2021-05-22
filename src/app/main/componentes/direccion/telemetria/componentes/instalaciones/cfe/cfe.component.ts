import {Component, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';
import {MatDialog} from '@angular/material/dialog';
import {RegMedidorComponent} from '@telemetria/instalaciones/cfe/reg-medidor/reg-medidor.component';
import {IMedidorD, IRecibosCfe} from '@telemetria/medidor-interface';
import {groupBy, toPairs} from 'lodash-es';
import {InstalacionQueryService} from '@telemetria/query/instalacion-query.service';
import {IGraficaC} from '@funcionesRaiz/graficas';
import {Chart} from 'chart.js';
import {GralesServices} from '@services/grales.service';

@Component({
    selector: 'app-cfe',
    templateUrl: './cfe.component.html',
    styleUrls: ['./cfe.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class CfeComponent
{
    detalles: any;
    grafCfe = 'grafCfe';
    grafica: Chart = null;

    constructor(private  _dialogRef: MatDialog, public _instSelect: InstalacionQueryService)
    {
    }

    valoresRecibidos(evento: IRecibosCfe[]): void
    {
        const agrupar = groupBy(evento, 'ano');
        this.detalles = toPairs(agrupar);
    }

    nvoMedidor(_id: string): void
    {
        const data: IMedidorD =
            {
                _id,
                esEditar: false,
                medidor: null
            };

        this._dialogRef.open(RegMedidorComponent, {width: '30%', hasBackdrop: false, data});
    }

    datosGrafica(evento: IGraficaC): void
    {
        if (this.grafica)
        {
            this.grafica.destroy();
        }
        this.grafica = GralesServices.graficar(this.grafCfe, evento.label, evento.datasets);
    }

    graficaAnual(evento: IGraficaC): void
    {
        if (this.grafica)
        {
            this.grafica.destroy();
        }
        this.grafica = GralesServices.graficar(this.grafCfe, evento.label, evento.datasets);
    }
}
