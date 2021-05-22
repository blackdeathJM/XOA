import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {IMedidor, IMedidorD, IReciboCfeD, IRecibosCfe} from '@telemetria/medidor-interface';
import {RegMedidorComponent} from '@telemetria/instalaciones/cfe/reg-medidor/reg-medidor.component';
import {RegReciboCfeComponent} from '@telemetria/instalaciones/cfe/reg-recibo-cfe/reg-recibo-cfe.component';
import {MatDialog} from '@angular/material/dialog';
import {forEach, groupBy, orderBy, sum} from 'lodash-es';
import {fuseAnimations} from '@plantilla/animations';
import {IDatasets, IGraficaC} from '@funcionesRaiz/graficas';
import {GralesServices} from '@services/grales.service';

@Component({
    selector: 'app-card-medidores',
    templateUrl: './card-medidores.component.html',
    styleUrls: ['./card-medidores.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardMedidoresComponent
{
    @Input() set medidor(val: IMedidor)
    {
        this._medidor = val;
    }
    @Input() set idInsta(val: string)
    {
        this._idInsta = val;
    }
    @Output() emitirMedidor = new EventEmitter<IRecibosCfe[]>();
    @Output() emitGrafAnual = new EventEmitter<IGraficaC>();

    _medidor: IMedidor;
    _idInsta: string;

    constructor(private _dialgoRef: MatDialog)
    {
    }

    bajaMedidor(medidor: IMedidor): void
    {
        const data: IMedidorD =
            {
                _id: this.idInsta,
                esEditar: true,
                medidor
            };
        this._dialgoRef.open(RegMedidorComponent, {width: '30%', hasBackdrop: false, data});
    }

    detalleRecibo(medidor: IMedidor): void
    {
        const ordenar = orderBy(medidor.recibos, ['mes'], ['desc']);
        this.emitirMedidor.emit(ordenar);
    }

    nuevoReciboCfe(medidor: IMedidor): void
    {
        const data: IReciboCfeD =
            {
                _id: this.idInsta,
                medidor
            };

        this._dialgoRef.open(RegReciboCfeComponent, {width: '40%', hasBackdrop: false, data});
    }

    graficarAnual(recibos: IRecibosCfe[]): void
    {
        const ejeX: string[] = [];
        const ejeY: IDatasets[] =
            [
                {
                    label: '',
                    borderWidth: 1,
                    borderColor: '#2b1529',
                    backgroundColor: GralesServices.colAleatorio(),
                    hoverBackgroundColor: '#353435',
                    data: []
                }
            ];
        const agrupar = groupBy(recibos, 'ano');

        let arreglo: number[] = [];

        forEach(agrupar, (val, prop) =>
        {
            ejeX.push(prop);
            for (const i of recibos)
            {
                if (i.ano === parseInt(prop, 10))
                {
                    arreglo.push(i.pago);
                }
            }
            ejeY[0].data.push(sum(arreglo));
            arreglo = [];
        });
        this.emitGrafAnual.emit({label: ejeX, datasets: ejeY});
    }

    imprimirGrafica(medidor: IMedidor): void
    {
        console.log('Imprimir grafica', medidor);
    }
}
