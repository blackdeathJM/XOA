import {Component, ContentChild, OnInit, ViewEncapsulation} from '@angular/core';
import {IAccionesPrimeTabla, IEventoAcciones, IOpcionesCarga, ParamPipe} from '@shared/widgets/tablas/prime-tabla/models/acciones-prime-tabla-interface';
import {GralesServices} from '@services/grales.service';
import {cargaDeArchivo} from '@shared/components/subidas/archivo-params';
import {ITablaColumnas} from '@funcionesRaiz/paginacion-interface';
import {DocsUsuarioFolioState} from '@usuarios/state/docs-folios.state';
import {WIDGET} from '@Config/widget.token';
import {IWidget} from '@Config/widget.interface';
import {TiposPipe} from '@shared/widgets/tablas/prime-tabla/models/tiposPipe';
import {finalize} from 'rxjs/operators';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {ProcesosDoc} from '@Config/enums';

enum AccionCarga
{
    subirResp = 'subirResp',
    subirAcuse = 'subirAcuse'
}

enum AccionesTabla
{
    verDocumento = 'verDocumento',
    verDocResp = 'verDocResp',
    verAcuse = 'verAcuse',
    terminarProceso = 'terminarProceso'
}

@Component({
    selector: 'app-busqueda-docs-usuario',
    templateUrl: './busqueda-docs-usuario.component.html',
    styleUrls: ['./busqueda-docs-usuario.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BusquedaDocsUsuarioComponent implements OnInit
{
    @ContentChild(WIDGET as any, {static: true}) widget: IWidget;
    archivoSubida = cargaDeArchivo(true);
    columnas: Array<ITablaColumnas> = [
        {propiedad: 'noSeguimiento', etiqueta: 'Seguimiento', ancho: {width: '100px'}, pipe: TiposPipe.numero},
        {propiedad: 'folio', etiqueta: 'Folio', columnaSpan: 2, color: 'yellow-fg'},
        {propiedad: 'tipoDoc', etiqueta: 'Tipo'},
        {propiedad: 'identificadorDoc', etiqueta: 'Identificador'},
        {propiedad: 'asunto', etiqueta: 'Asunto'},
        {propiedad: 'dependencia', etiqueta: 'Dependencia'},
        {propiedad: 'fechaTerminado', etiqueta: 'Fecha', pipe: TiposPipe.fecha},
        {propiedad: 'comentario', etiqueta: 'Comentario'}
    ];
    acciones: Array<IAccionesPrimeTabla> =
        [
            {
                accion: AccionesTabla.verDocumento,
                icono: 'get_app',
                color: 'accent',
                claseColor: 'yellow-fg',
                tooltip: 'Ver documento recibido'
            },
            {
                accion: AccionesTabla.verDocResp,
                icono: 'get_app',
                color: 'primary',
                tooltip: 'Ver documento foliado'
            },
            {
                accion: AccionesTabla.verAcuse,
                icono: 'get_app',
                claseColor: 'green-A400-fg',
                color: 'accent',
                tooltip: 'Ver acuse'
            },
            {
                accion: AccionesTabla.terminarProceso,
                icono: 'archive',
                claseColor: 'green-A400-fg',
                color: 'accent',
                tooltip: 'Dar por terminado el documento'
            }
        ];

    accionesCarga: Array<IOpcionesCarga> = [];

    paramPipe = ParamPipe.folios;
    skeleton = false;

    constructor(public _docsFolioState: DocsUsuarioFolioState)
    {
    }

    ngOnInit(): void
    {
        this.accionesCarga.push(this.opcionesCarga(AccionCarga.subirResp, 'Subir documento de respuesta', 'der', 'amber-fg'));
        this.accionesCarga.push(this.opcionesCarga(AccionCarga.subirAcuse, 'Subir Acuse de respuesta', 'acu', 'cyan-fg'));
    }

    opcionesCarga(accion: string, tooltip: string, prefijo: string, claseColorIcon: string): IOpcionesCarga
    {
        return {
            accion,
            param: 'folios',
            tooltip,
            reemplazar: false,
            allowedFileType: ['pdf'],
            allowedMimeType: ['application/pdf'],
            icono: 'publish',
            claseColorIcon,
            multiple: false,
            autoCargar: true,
            esIconButton: true,
            prefijo
        };
    }

    busquedaGral(evento: string): void
    {
        this.skeleton = true;
        this._docsFolioState.busquedaGralUsuario(evento).pipe(finalize(() => this.skeleton = false)).subscribe();
    }

    cambio(evento: string): void
    {
        this.skeleton = true;
        switch (evento)
        {
            case 'pendientes':
                this._docsFolioState.docsPenFolIntExt().pipe(finalize(() => this.skeleton = false)).subscribe();
                break;
            case 'externo':
                this._docsFolioState.docUsuarioExtEntregado().pipe(finalize(() => this.skeleton = false)).subscribe();
                break;
            default:
                this._docsFolioState.docUsuarioTipoDoc(evento).pipe(finalize(() => this.skeleton = false)).subscribe();
                break;
        }
    }

    accionRecibida(evento: IEventoAcciones): void
    {
        switch (evento.accion)
        {
            // propiedades del objeto accion y datos
            case AccionesTabla.verDocumento:
                if (evento.datos.docUrl)
                {
                    window.open(GralesServices.obtenerDoc(evento.datos.docUrl, 'dex'), '_blank');
                }
                break;
            case AccionesTabla.verDocResp:
                if (evento.datos.docRespUrl)
                {
                    window.open(GralesServices.obtenerDoc(evento.datos.docRespUrl, 'der'), '_blank');
                }
                break;
            case AccionesTabla.verAcuse:
                if (evento.datos.acuseUrl)
                {
                    window.open(GralesServices.obtenerDoc(evento.datos.acuseUrl, 'acu'), '_blank');
                }
                break;
            case AccionesTabla.terminarProceso:
                this._docsFolioState.terminarProceso(evento.datos._id);
                break;
            case AccionCarga.subirResp:
                if (evento.datos.docRespUrl)
                {
                    toastSweet(TipoAlerta.alerta, 'No puedes volver a subir el documento porque ya se encuentra registrado', 5000);
                } else
                {
                    this._docsFolioState.docResUrlAcuse(evento.datos._id, evento.archivo.toString(), ProcesosDoc.acuse,
                        evento.datos.esInterno, true).subscribe(res =>
                    {
                        if (res.estatus)
                        {
                            toastSweet(TipoAlerta.satisfactorio, 'El documento se ha subido de manera correcta', 5000);
                        }
                    }, error => toastSweet(TipoAlerta.error, 'Ocurrio un error inesperado: ' + error, 5000));
                }
                break;
            case AccionCarga.subirAcuse:
                if (evento.datos.acuseUrl)
                {
                    toastSweet(TipoAlerta.alerta, 'No puedes volver a subir el acuse porque ya se encuentra registrado', 5000);
                } else
                {
                    this._docsFolioState.docResUrlAcuse(evento.datos._id, evento.archivo.toString(), ProcesosDoc.entregado,
                        evento.datos.esInterno, false).subscribe(res =>
                    {
                        if (res.estatus)
                        {
                            toastSweet(TipoAlerta.satisfactorio, 'El documento se ha subido de manera correcta', 5000);
                        }
                    }, error => toastSweet(TipoAlerta.error, 'Ocurrio un error inseperado: ' + error, 5000));
                }
                break;
        }
    }
}
