import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {IDocExt} from '../../../../direccion/documentos/models/docExt.interface';
import {antesDeSubirArchivo, cargaDeArchivo} from '@shared/components/subidas/archivo-params';
import {MatDialog} from '@angular/material/dialog';
import {DocsUsuarioState} from '@usuarios/state/docs-usuario.state';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {FileItem} from 'ng2-file-upload';
import Swal from 'sweetalert2/dist/sweetalert2';
import {DepartamentoState} from '@global/state/departamento.state';
import {SesionState} from '@usuarios/state/sesion.state';
import {selecCentroGestor} from '@usuarios/componentes/documentacion/services/funciones';
import {IWidget} from '@Config/widget.interface';
import {WIDGET} from '@Config/widget.token';
import {Subscription} from 'rxjs';
import {Prefijos, ProcesosDoc} from '@Config/enums';

@Component({
    selector: 'app-docs-ext-recibidos-lista',
    templateUrl: './docs-ext-recibidos-lista.component.html',
    styleUrls: ['./docs-ext-recibidos-lista.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers:
        [
            {
                provide: WIDGET,
                useExisting: DocsExtRecibidosListaComponent
            }
        ]
})
export class DocsExtRecibidosListaComponent implements OnInit, IWidget
{
    cargaDeArchivo = cargaDeArchivo(true);
    cargandoArchivoTem = false;
    generandoFolioResp = false;

    estaCargando: boolean;
    tieneDatos: boolean;
    totalElementos: number;
    textoError = 'Ha ocurrido un error inesperado: ';

    subscripciones: Subscription = new Subscription();

    constructor(private _dialogRef: MatDialog, public _docsUsuarioState: DocsUsuarioState, private _deptoState: DepartamentoState,
                private sesionState: SesionState)
    {
    }

    ngOnInit(): void
    {
        this.tieneDatos = true;
        this.estaCargando = true;
        this.subscripciones.add(this._docsUsuarioState.listarDocsUsuario().subscribe((docs) =>
        {
            this.docsObtenidos(docs.documentos);
        }, error => toastSweet(TipoAlerta.error, this.textoError + error, 5000)));
    }

    subirDocTemp(abrirExplorador: HTMLInputElement, documento: IDocExt): void
    {
        const procesosRespuestaTemp = [ProcesosDoc.aprobado, ProcesosDoc.acuse, ProcesosDoc.terminado, ProcesosDoc.entregado];

        if (procesosRespuestaTemp.includes(documento.usuarioDestino[0].subproceso))
        {
            toastSweet(TipoAlerta.alerta, `El documento no puedes volverlo a subir porque se encuentra:${documento.usuarioDestino[0].subproceso}`,
                5000);
        } else
        {
            if (documento.docUrl)
            {
                abrirExplorador.click();
                this.cargaDeArchivo.onBeforeUploadItem = antesSubir =>
                {
                    this.cargandoArchivoTem = true;
                    if (documento.usuarioDestino[0].docUrl)
                    {
                        antesSubir.file.name = documento.usuarioDestino[0].docUrl;
                    } else
                    {
                        antesSubir.file.name = antesDeSubirArchivo(antesSubir.file.name, Prefijos.docExtUsuarioTemp);
                    }
                };
                this.cargaDeArchivo.onCompleteItem = (elemento: FileItem) =>
                {
                    if (elemento.isSuccess)
                    {
                        this._docsUsuarioState.archivoTemporalUsuario(documento._id, elemento.file.name).subscribe((doc) =>
                        {
                            if (doc.estatus)
                            {
                                this.cargandoArchivoTem = false;
                                toastSweet(TipoAlerta.satisfactorio, 'El archivo se ha subido correctamente', 5000);
                            }

                        });
                    } else
                    {
                        toastSweet(TipoAlerta.error, 'Ocurrio un error al tratar de subir el archivo', 5000);
                        this.cargandoArchivoTem = false;
                    }
                };
            } else
            {
                toastSweet(TipoAlerta.alerta, 'No se ha detectado algun documento al que puedas dar respuesta', 5000);
                this.cargandoArchivoTem = false;
            }
        }
    }

    generarFolioResp(documento: IDocExt, indice: number): void
    {
        this.subscripciones.add(this._deptoState.listaDeptos().subscribe(async (deptos) =>
        {
            const centroGestor = await selecCentroGestor(this.sesionState.snapshot.departamentoID, deptos.documentos);

            this.generandoFolioResp = true;

            Swal.fire({
                title: 'Confirmacion?',
                text: 'La generacion de este folio sera utilizado como respuesta al documento seleccionado deseas continuar!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                customClass: 'swal-text',
                confirmButtonText: 'Si, generar folio de respuesta!'
            }).then((result) =>
            {
                if (result.isConfirmed)
                {

                    this._docsUsuarioState.genFolioResp(documento._id, centroGestor, indice).subscribe(() =>
                    {
                        this.generandoFolioResp = false;
                        Swal.fire(
                            'Folio generado!',
                            'Tu folio de respuesta se ha generado correctamente.',
                            'success'
                        );
                    });
                } else
                {
                    this.generandoFolioResp = false;
                }
            });
        }));
    }

    recargarListaDocsUsuario(): void
    {
        this._docsUsuarioState.recargarListaDocsUsuario().subscribe((docs) =>
        {
            this.docsObtenidos(docs.documentos);
        }, error => toastSweet(TipoAlerta.error, this.textoError + error, 5000));
    }

    docsObtenidos(documentos: IDocExt[]): void
    {
        if (documentos.length > 0)
        {
            this.totalElementos = documentos.length;
            this.estaCargando = false;
        } else
        {
            this.tieneDatos = false;
        }
    }
}
