import {ChangeDetectionStrategy, Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {fuseAnimations} from '@plantilla/animations';
import {PuentePortalService} from '@services/puente-portal.service';
import {SolicitudesState} from '@dir-comercial/solicitudes.state';
import JsPDF from 'jspdf';
import {ISolicitudServ} from '@dir-comercial/solicitudServ.interface';
import {MatDialog} from '@angular/material/dialog';
import {ActualizarSolicitudServComponent} from '@dir-comercial/reg-solicitud-serv/actualizar-solicitud-serv/actualizar-solicitud-serv.component';
import {IModalInfo} from '@funcionesRaiz/modal.interface';
import {Canvas, Columns, Img, Line, PdfMakeWrapper, Rect, Stack, Txt} from 'pdfmake-wrapper';
import organismo from 'assets/organismo/organismo.json';
import {ICliente, IContrato, IResCliente} from '@dir-comercial/cliente.interface';
import {ClienteState} from '@dir-comercial/cliente.state';
import {Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-detalles-solicitud-serv',
    templateUrl: './detalles-solicitud-serv.component.html',
    styleUrls: ['./detalles-solicitud-serv.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fuseAnimations]
})
export class DetallesSolicitudServComponent implements OnDestroy
{
    @Input() visible = false;
    subscripciones: Subscription = new Subscription();
    datosRef: ICliente;
    cargandoDatos = false;

    constructor(private _puentePortal: PuentePortalService, public _solicitudServ: SolicitudesState, private _dr: MatDialog,
                private _clienteState: ClienteState)
    {

    }

    generarPagoServ(solicitudServ: ISolicitudServ): void
    {
        const pdf = new JsPDF({orientation: 'l'});

        pdf.text('Solicitud de verificacion de servicios de agua o drenaje', 10, 20);
        pdf.f2(5);
        pdf.line(10, 21, 100, 21);
        this._solicitudServ.aprovRechSolicitud(solicitudServ._id, true).subscribe();
    }

    imprimirOrdenServ(solicitudServ: ISolicitudServ): void
    {
        // const pdf = new JsPDF({orientation: 'p', unit: 'cm'});
        // pdf.text('Sistema Municipal', 10, 10, {baseline: 'middle', maxWidth: 200}, null);
        // pdf.save();
        this.cargandoDatos = true;
        this.subscripciones.add(this._clienteState.datosRef(solicitudServ.medidorRef).pipe(tap((res: IResCliente) =>
        {
            this.cargandoDatos = false;
            // this.crearOrdenServicio(solicitudServ, res.documento.contratos[0]).then();
            console.log('+++++++++++', res.documento);
        })).subscribe());
    }

    actualizarOrden(solicitudServ: ISolicitudServ): void
    {
        const data: IModalInfo =
            {
                esReg: false,
                datos: solicitudServ
            };
        this._dr.open(ActualizarSolicitudServComponent, {width: '45%', data});
    }

    generarContrato(solicitudServ: any): void
    {

    }

    async crearOrdenServicio(solicitud: ISolicitudServ, ref: IContrato): Promise<void>
    {
        const pdf = new PdfMakeWrapper();
        const verificacion = `Verificacion de servicio para contratacion y/o presupuesto`;
        const subDir = `SUB DIRECCION DE COMERCIALIZACION ----> CONTRATACION`;
        const margen: [number, number, number, number] = [0, 5, 5, 0];
        pdf.pageSize('a4');
        pdf.styles({
            relleno: {
                background: '#c2c2c2'
            }
        });
        // pdf.background(await new Img(organismo.pdf).opacity(.1).fit([1, 1]).build());
        // pdf.add(new Txt(organismo.organismo).alignment('center').end);
        pdf.add(new Columns([await new Img(organismo.logo).width(50).height(75).build(),
            new Stack([organismo.organismo, organismo.telefonos.join('/'), subDir, verificacion]).end]).columnGap(3)
            .alignment('center').end);
        pdf.add(new Canvas([new Line([520, 10], [0, 10]).end]).end);
        pdf.add('\n');
        pdf.add(new Txt(`Nombre: ${solicitud.cliente.nombreCompleto}`).preserveLeadingSpaces().end);
        pdf.add(new Columns([`Calle: ${solicitud.calle}`, `Colonia: ${solicitud.colonia}`]).end);
        pdf.add(`Entre calles: ${solicitud.entreCalles}`);
        pdf.add(`Referencia: ${solicitud.referencia}`);
        pdf.add(new Columns([`Servicio solicitado: ${solicitud.servSolicitado}`, `Tipo de predio: ${solicitud.tipoPredio}`]).end);
        pdf.add(new Columns([`Area del predio: ${solicitud.areaPredio} mt2`, `Area construida: ${solicitud.areaConstruida} mt2`]).end);
        pdf.add(new Columns([`Almacenamiento: ${solicitud.almacenamiento}`, `Tarifa: ${solicitud.tarifa}`]).end);
        pdf.add(new Columns([`Material del arroyo de calle: ${solicitud.matArroyoCalle}`, `Material de acera: ${solicitud.matAcera}`]).end);
        pdf.add('\n');
        pdf.add(new Txt('Observaciones').alignment('center').end);
        pdf.add(solicitud.observaciones);
        pdf.add('\n');
        pdf.add(new Txt('Comentarios').alignment('center').end);
        pdf.add(new Canvas([new Line([520, 10], [0, 10]).end]).margin(margen).end);
        pdf.add(new Canvas([new Line([520, 10], [0, 10]).end]).margin(margen).end);
        pdf.add(new Canvas([new Line([520, 10], [0, 10]).end]).margin(margen).end);
        pdf.add(new Canvas([new Line([520, 10], [0, 10]).end]).margin(margen).end);
        pdf.add(new Canvas([new Line([520, 10], [0, 10]).end]).margin(margen).end);
        pdf.add('\n');
        pdf.add(new Canvas([new Rect(0, [520, 30]).color('#8f8f8f').lineColor('#020202').end]).end);
        pdf.add(new Txt('Datos de referencia').alignment('center').relativePosition(0, -21).bold().end);
        pdf.add('\n');
        pdf.add('');
        pdf.add(new Columns([`Medidor de referencia: --- Falta de colocar`, `No. Cuenta: --- falta de colocar`]).end);
        pdf.add('Referencia: --- Colocar referencia');
        pdf.create().open();
    }

    ngOnDestroy(): void
    {
        this.subscripciones.unsubscribe();
    }
}
