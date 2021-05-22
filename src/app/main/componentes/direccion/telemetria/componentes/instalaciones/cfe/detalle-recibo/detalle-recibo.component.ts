import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';
import {IRecibosCfe} from '@telemetria/medidor-interface';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {IAccionesPrimeTabla, IEventoAcciones} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {forEach} from 'lodash-es';
import {GralesServices} from '@services/grales.service';
import {environment} from '@env/environment';
import {IDatasets, IGraficaC} from '@funcionesRaiz/graficas';
import {TiposPipe} from '@shared/widgets/tablas/prime-tabla/models/tiposPipe';

@Component({
    selector: 'app-detalle-recibo',
    templateUrl: './detalle-recibo.component.html',
    styleUrls: ['./detalle-recibo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class DetalleReciboComponent
{
    @Input() set detallesRecibos(val: IRecibosCfe[])
    {
        this._detallesRecibos = val;
    }

    @Input() set ano(val: string)
    {
        this._ano = val;
    }

    @Output() datosGrafica = new EventEmitter<IGraficaC>();
    _detallesRecibos: IRecibosCfe[] = [];
    _ano: string;
    columnas: ITablaColumnas[] = [
        {
            etiqueta: 'Mes',
            propiedad: 'mes'
        },
        {
            etiqueta: 'Lectura',
            propiedad: 'lectura'
        },
        {
            etiqueta: 'Costo KW',
            propiedad: 'costoKw',
            pipe: TiposPipe.moneda
        },
        {
            etiqueta: 'Pago',
            propiedad: 'pago',
            pipe: TiposPipe.moneda
        }
    ];
    btnAcciones: IAccionesPrimeTabla[] =
        [
            {
                accion: 'recibo',
                icono: 'link',
                color: 'primary',
            }
        ];

    graficar(evento: MouseEvent): void
    {
        evento.stopPropagation();
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
        forEach(this._detallesRecibos, valor =>
        {
            ejeX.push(GralesServices.convertirMes(valor.mes));
            ejeY[0].data.push(valor.pago);
        });
        ejeX.reverse();
        ejeY[0].data.reverse();

        this.datosGrafica.emit({label: ejeX, datasets: ejeY});
    }

    accionTabla(evento: IEventoAcciones): void
    {
        if (evento.datos)
        {
            window.open(`${environment.apiUrl}/cfe?archivoUrl=${evento.datos.imgRecibo}`, '_blank');
        }
    }

    imprimirPagos(evento: MouseEvent): void
    {
        console.log('evento', evento);
    }
}
