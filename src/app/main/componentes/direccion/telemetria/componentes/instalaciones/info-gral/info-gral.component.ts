import {Component, ViewEncapsulation} from '@angular/core';
import {InstalacionQueryService} from '@telemetria/query/instalacion-query.service';
import {fuseAnimations} from '@plantilla/animations';
import {Canvas, Columns, Line, PdfMakeWrapper, QR, Stack, Txt} from 'pdfmake-wrapper';
import {IInstalacion} from '@telemetria/instalacion-interface';
import {TelemetriaState} from '@telemetria/telemetriaState';

@Component({
    selector: 'app-info-gral',
    templateUrl: './info-gral.component.html',
    styleUrls: ['./info-gral.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [fuseAnimations]
})

export class InfoGralComponent
{

    constructor(public _teleQuery: InstalacionQueryService, private _teleState: TelemetriaState)
    {
    }

    generarPdf(instalacion: IInstalacion): void
    {
        const pdf = new PdfMakeWrapper();
        pdf.styles(
            {
                cab:
                    {
                        color: '#0495a2',
                    }
            });
        // pdf.pageSize('A4');
        // pdf.info({title: 'titulo documento', author: 'blackdeath', subject: 'asunto del documento'});
        // pdf.header('Cabecera del pdf');
        // pdf.add('Instalacion: ' + instalacion.nombre);
        // pdf.watermark('BLACKDEATH');

        pdf.add(new Txt('Si funciona el estilo').alignment('center').style('cab').end);
        pdf.add(new Columns(['Hola: ' + instalacion.nombre, 'mundo', 'otra columa mas']).decoration('underline').end);
        pdf.add(new Columns(['Hello: ', 'world']).end);
        pdf.add(new Stack(['Hello', 'world']).end);
        pdf.add(new QR('codigoQR').end);
        const line = new Line([0, 100], [100, 0]).end;

        pdf.add(new Canvas([line]).end);
        pdf.create().open();
    }
}
