import {Component, ViewEncapsulation} from '@angular/core';
import {GralesServices} from '@services/grales.service';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {fuseAnimations} from '@plantilla/animations';
import {TelemetriaState} from '@telemetria/telemetriaState';
import {forEach, orderBy, range, toArray} from 'lodash-es';
import {IDatasets} from '@funcionesRaiz/graficas';
import {Chart} from 'chart.js';
import {Img, PdfMakeWrapper} from 'pdfmake-wrapper';

@Component({
    selector: 'app-comparativas',
    templateUrl: './comparativas.component.html',
    styleUrls: ['./comparativas.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})
export class ComparativasComponent
{
    meses = range(1, 14);
    idGraf = 'idGraf';
    grafica: Chart = null;
    ejeX: string[] = [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
    ];
    ejeY: IDatasets[] = [];

    parametro = '';
    valoresTransNivelE: any;
    valoresTransNivelD: any;
    valoresTransCfe: any;

    columnas: ITablaColumnas[] = [
        {
            etiqueta: 'Instalacion',
            propiedad: 'nombre',
            color: 'yellow-fg',
            columnaSpan: 2
        },
        {
            etiqueta: 'Ene',
            propiedad: 'ene',
        },
        {
            etiqueta: 'Feb',
            propiedad: 'feb',
        },
        {
            etiqueta: 'Mar',
            propiedad: 'mar',
        },
        {
            etiqueta: 'Abr',
            propiedad: 'abr',
        },
        {
            etiqueta: 'May',
            propiedad: 'may',
        },
        {
            etiqueta: 'Jun',
            propiedad: 'jun',
        },
        {
            etiqueta: 'Jul',
            propiedad: 'jul',
        },
        {
            etiqueta: 'Ago',
            propiedad: 'ago',
        },
        {
            etiqueta: 'Sep',
            propiedad: 'sep',
        },
        {
            etiqueta: 'Oct',
            propiedad: 'oct',
        },
        {
            etiqueta: 'Nov',
            propiedad: 'nov',
        },
        {
            etiqueta: 'Dic',
            propiedad: 'dic',
        },
    ];

    constructor(public _teleState: TelemetriaState)
    {
    }

    async imprimir(): Promise<void>
    {
        // let canvas = document.getElementById('idGraf');
        const canvas = document.getElementById(this.idGraf) as HTMLCanvasElement;
        const ima = new Image();
        ima.src = canvas.toDataURL('image/png', 1.0);
        const pdf = new PdfMakeWrapper();

        pdf.images({picture1: await new Img(ima.src).build()});
        pdf.create().open();
    }

    async nivelesEstaticos(evento: string): Promise<void>
    {
        if (this.grafica)
        {
            this.grafica.destroy();
        }
        this.valoresTransNivelE = this.transformarDatos(parseInt(evento, 10), 'lecturas', 'nivelE');
        this.ejeY = await this.graficar(this.valoresTransNivelE, 'Niveles Estaticos');

        this.grafica = GralesServices.graficar(this.idGraf, this.ejeX, this.ejeY);
    }

    async nivelesDinamicos(evento: string): Promise<void>
    {
        if (this.grafica)
        {
            this.grafica.destroy();
        }
        this.valoresTransNivelD = this.transformarDatos(parseInt(evento, 10), 'lecturas', 'nivelD');
        this.ejeY = await this.graficar(this.valoresTransNivelD, 'Niveles dinamicos');
        this.grafica = GralesServices.graficar(this.idGraf, this.ejeX, this.ejeY);
    }

    async pagosCfe(evento: string): Promise<void>
    {
        if (this.grafica)
        {
            this.grafica.destroy();
        }

        this.valoresTransCfe = this.transformarDatosCfe(parseInt(evento, 10));
        const ordenar: any = [];

        for (const v of this.valoresTransCfe)
        {
            const y = this.valoresTransCfe.indexOf(v);

            for (let i = 1; i < 13; i++)
            {
                if (!v.hasOwnProperty(GralesServices.convertirMes(i).toLowerCase()))
                {
                    await Object.defineProperty(this.valoresTransCfe[y], GralesServices.convertirMes(i).toLowerCase(),
                        {
                            value: 0,
                            writable: true,
                            enumerable: true,
                            configurable: true
                        });
                }
            }
        }
        this.valoresTransCfe.forEach(v =>
        {
            ordenar.push({
                nombre: v.nombre,
                ene: v.ene,
                feb: v.feb,
                mar: v.mar,
                abr: v.abr,
                may: v.may,
                jun: v.jun,
                jul: v.jul,
                ago: v.ago,
                sep: v.sep,
                oct: v.oct,
                nov: v.nov,
                dic: v.dic
            });

        });
        this.ejeY = await this.graficar(ordenar, 'Pagos de CFE');
        this.grafica = GralesServices.graficar(this.idGraf, this.ejeX, this.ejeY);
    }

    private async graficar(valores: any, param: string): Promise<IDatasets[]>
    {
        this.parametro = param;
        const chart: IDatasets[] = [];

        await forEach(valores, valor =>
        {
            chart.push(
                {
                    backgroundColor: GralesServices.colAleatorio(), borderColor: '#009292', borderWidth: 1, hoverBackgroundColor: '#009292',
                    data: toArray(valor).splice(1),
                    label: toArray(valor).shift().toString()
                });
        });
        return chart;
    }

    private transformarDatos(ano: number, nomDoc: string, subDoc: string): any
    {
        const valoresTrans = [];

        forEach(this._teleState.snapshot, inst =>
        {
            if (inst[nomDoc])
            {
                if (inst[nomDoc][subDoc] || inst[nomDoc])
                {
                    forEach(inst[nomDoc][subDoc], valor =>
                    {
                        if (valor.ano === ano)
                        {
                            valoresTrans.push(
                                {
                                    nombre: inst.nombre,
                                    ene: valor.ene,
                                    feb: valor.feb,
                                    mar: valor.mar,
                                    abr: valor.abr,
                                    may: valor.may,
                                    jun: valor.jun,
                                    jul: valor.jul,
                                    ago: valor.ago,
                                    sep: valor.sep,
                                    oct: valor.oct,
                                    nov: valor.nov,
                                    dic: valor.dic
                                });
                        }
                    });
                }
            }
        });
        return valoresTrans;
    }

    private transformarDatosCfe(ano: number): any
    {
        const valoresTrans = [];
        forEach(this._teleState.snapshot, (inst, indice) =>
        {
            valoresTrans.push({nombre: inst.nombre});
            if (inst.medidores)
            {
                forEach(inst.medidores, medidor =>
                {
                    forEach(orderBy(medidor.recibos, ['mes'], ['asc']), async rec =>
                    {
                        if (ano === rec.ano)
                        {
                            await Object.defineProperty(valoresTrans[indice], GralesServices.convertirMes(rec.mes).toLowerCase(), {
                                value: rec.pago,
                                configurable: true,
                                enumerable: true,
                                writable: true
                            });
                        }
                    });
                });
            }
        });
        return valoresTrans;
    }
}

