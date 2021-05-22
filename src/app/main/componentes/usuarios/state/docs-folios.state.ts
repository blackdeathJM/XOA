import {DataAction, Payload, StateRepository} from '@ngxs-labs/data/decorators';
import {NgxsAfterBootstrap, State} from '@ngxs/store';
import {IDocExt, IResDocEx} from '../../direccion/documentos/models/docExt.interface';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {Observable} from 'rxjs';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import {DocsUsuarioMutationService} from '@usuarios/componentes/documentacion/services/docs-usuario.mutation.service';
import {DocsUsuarioQueryService} from '@usuarios/componentes/documentacion/services/docs-usuario.query.service';
import {orderBy, remove} from 'lodash-es';
import {SesionState} from '@usuarios/state/sesion.state';
import {INotificacion, PRIORIDAD} from '@global/models/notificacion.interface';
import moment from 'moment';
import {NotificarState} from '@global/state/notificar.state';
import Swal from 'sweetalert2/dist/sweetalert2';
import {tap} from 'rxjs/operators';

@StateRepository()
@State<IDocExt[]>({name: 'docsUsuariosFolios', defaults: []})
@Injectable()
export class DocsUsuarioFolioState extends NgxsDataRepository<IDocExt[]> implements NgxsAfterBootstrap
{
    error: 'Ha ocurrido un error inesperado ';
    modeloNotificar: INotificacion =
        {
            descripcion: '',
            receptor: [],
            fechaEnvio: moment().toISOString(),
            prioridad: PRIORIDAD.NORMAL,
            visto: false,
            emisor: ''
        };

    constructor(private _docsUsuarioMutation: DocsUsuarioMutationService, private _docsUsuarioQuery: DocsUsuarioQueryService,
                private _sesionState: SesionState, private _notState: NotificarState)
    {
        super();
    }

    @DataAction() regFolio(@Payload('registroFolio') documento: IDocExt, refDoc: number): Observable<IResDocEx>
    {
        return this._docsUsuarioMutation.asigElfolioPorTipoDoc(documento, refDoc).pipe(tap((res: IResDocEx) =>
        {
            this.ctx.setState(this.nvoEstado(documento._id).concat(res.documento));
        }));
    }

    @DataAction() docsPenFolIntExt(): Observable<IResDocEx>
    {
        try
        {
            return this._docsUsuarioQuery.docsPendFolIntExt(this._sesionState.snapshot.usuario).pipe(
                tap((docs: IResDocEx): void => this.ctx.setState(docs.documentos)));
        } catch (e)
        {
            toastSweet(TipoAlerta.error, this.error + e, 5000);
        }
    }

    @DataAction() docResUrlAcuse(@Payload('Subir docResp') _id: string, documento: string, proceso: string, esInterno: boolean,
                                 esDocRespUrl: boolean): Observable<IResDocEx>
    {
        return this._docsUsuarioMutation.docRespUrlAcuseUrl(_id, documento, proceso, this._sesionState.snapshot.usuario, esInterno, esDocRespUrl)
            .pipe(tap((res: IResDocEx) =>
            {
                this.modeloNotificar.receptor.push(res.documento.enviadoPor);
                this.modeloNotificar.emisor = this._sesionState.snapshot.usuario;
                this.modeloNotificar.descripcion = `Han subido un nuevo acuse al folio: ${res.documento.folio}`;
                this._notState.agregarNot(this.modeloNotificar).subscribe();
                this.filtroDocs(_id, res.documento);
            }));
    }

    @DataAction() busquedaGralUsuario(@Payload('busquedaGralUsuario') consulta: string): Observable<IResDocEx>
    {
        return this._docsUsuarioQuery.busquedaGralUsuario(this._sesionState.snapshot.usuario, consulta).pipe(
            tap((res: IResDocEx) =>
            {
                this.ctx.setState(res.documentos);
            }));
    }

    @DataAction() docUsuarioTipoDoc(@Payload('busqueda ufolio') tipoDoc: string): Observable<IResDocEx>
    {
        return this._docsUsuarioQuery.docUsuarioTipoDoc(this._sesionState.snapshot.usuario, tipoDoc).pipe(
            tap((doc: IResDocEx) =>
            {
                this.ctx.setState(doc.documentos);
            }));
    }

    @DataAction() terminarProceso(@Payload('TerminarProceso') _id: string): void
    {
        Swal.fire({
            title: 'Finalizar documento?',
            text: 'Estas seguro(a) de querer dar por finalizado el documento?, este proceso no se puede revertir!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            customClass: 'swal-text',
            confirmButtonText: 'Si, Dar por finalizado el documento!'
        }).then((result) =>
        {
            if (result.value)
            {
                this._docsUsuarioMutation.terminarDocUsuario(_id).subscribe((doc: IResDocEx) =>
                {
                    Swal.fire(
                        {
                            title: 'Finalizado',
                            text: doc.mensaje,
                            icon: 'success',
                            time: '5000',
                            customClass: 'swal-text'
                        }
                    );
                    this.ctx.setState(orderBy(this.nvoEstado(_id).concat(doc.documento), ['noSeguimiento'], ['desc']));
                });
            }
        });
    }

    @DataAction() docUsuarioExtEntregado(): Observable<IResDocEx>
    {
        return this._docsUsuarioQuery.docUsuarioExtEntregado(this._sesionState.snapshot.usuario).pipe(tap((doc: IResDocEx) =>
        {
            if (doc.documentos)
            {
                this.ctx.setState(doc.documentos);
            }
        }));
    }

    private filtroDocs(_id: string, res: IDocExt): void
    {
        new Promise((resolve) =>
        {
            resolve(remove(res.usuarioDestino, (n) =>
                n.usuario !== this._sesionState.snapshot.usuario));
        }).then(() =>
        {
            const nvo = orderBy(this.nvoEstado(_id).concat(res), ['noSeguimiento'], ['desc']);
            if (nvo)
            {
                this.ctx.setState(nvo);
            } else
            {
                this.ctx.setState(this.initialState);
            }
        }).catch(
            error =>
            {
                toastSweet(TipoAlerta.error, error, 5000);
            }
        );
    }

    private nvoEstado(_id: string): IDocExt[]
    {
        return this.ctx.getState().filter(d => d._id !== _id);
    }
}
