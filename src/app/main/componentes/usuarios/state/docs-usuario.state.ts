import {DataAction, Payload, StateRepository} from '@ngxs-labs/data/decorators';
import {NgxsAfterBootstrap, State} from '@ngxs/store';
import {IDocExt, IResDocEx} from '../../direccion/documentos/models/docExt.interface';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {DocsUsuarioSubscriptionService} from '@usuarios/componentes/documentacion/services/docs-usuario.subscription.service';
import {SesionState} from '@usuarios/state/sesion.state';
import {TipoAlerta} from '@shared/alerts/values.config';
import {toastSweet} from '@shared/alerts/toasts';
import {Observable} from 'rxjs';
import {DocsUsuarioQueryService} from '@usuarios/componentes/documentacion/services/docs-usuario.query.service';
import {ProcesosDoc} from '@Config/enums';
import {take, tap} from 'rxjs/operators';
import {DocsUsuarioMutationService} from '@usuarios/componentes/documentacion/services/docs-usuario.mutation.service';
import {orderBy, remove} from 'lodash-es';
import {INotificacion, PRIORIDAD} from '@global/models/notificacion.interface';
import moment from 'moment';
import {NotificarState} from '@global/state/notificar.state';

@StateRepository()
@State<IDocExt[]>({name: 'docsUsuario', defaults: []})
@Injectable()
export class DocsUsuarioState extends NgxsDataRepository<IDocExt[]> implements NgxsAfterBootstrap
{
    private modeloNotificar: INotificacion =
        {
            descripcion: '',
            emisor: '',
            fechaEnvio: moment().toISOString(),
            prioridad: PRIORIDAD.NORMAL,
            receptor: [],
            visto: false
        };
    private error = 'Ha ocurrido un error inesperado ';
    private subprocesos = [ProcesosDoc.pendiente, ProcesosDoc.enviado, ProcesosDoc.rechazado, ProcesosDoc.aprobado];

    constructor(private _docsSubscription: DocsUsuarioSubscriptionService, private _sesionState: SesionState, private _notState: NotificarState,
                private _docsUsuarioQuery: DocsUsuarioQueryService, private _docsUsuarioMutation: DocsUsuarioMutationService)
    {
        super();
    }

    @DataAction() recargarListaDocsUsuario(): Observable<IResDocEx>
    {
        return this._docsUsuarioQuery.listarDocsPorUsuarioSubproceso(this._sesionState.snapshot.usuario, this.subprocesos).pipe(
            tap((docs: IResDocEx) => this.ctx.setState(docs.documentos)));
    }

    @DataAction() archivoTemporalUsuario(@Payload('docsUsuario') _id: string, docUrl: string): Observable<IResDocEx>
    {
        return this._docsUsuarioMutation.acDocUrlEnUsuarioDestino(_id, this._sesionState.snapshot.usuario, docUrl, ProcesosDoc.enviado)
            .pipe(tap((res: IResDocEx) =>
            {
                if (res.documento)
                {
                    this.modeloNotificar.receptor.push(res.documento.enviadoPor);
                    this.modeloNotificar.emisor = this._sesionState.snapshot.usuario;
                    this.modeloNotificar.descripcion = `Tienes una respuesta al documento: ${res.documento.identificadorDoc.toUpperCase()}`;
                    this._notState.agregarNot(this.modeloNotificar).subscribe();
                    this.filtroDocs(_id, res.documento);
                } else
                {
                    this.ctx.setState(this.initialState);
                }
            }));
    }

    @DataAction() genFolioResp(@Payload('genFolioResp') _id: string, centroGestor: string, indice: number): Observable<IResDocEx>
    {
        try
        {
            return this._docsUsuarioMutation.genFolioRespDoc(_id, this._sesionState.snapshot.usuario, centroGestor).pipe(tap(async (doc: IResDocEx) =>
            {
                if (doc.documento)
                {
                    this.modeloNotificar.receptor.push(doc.documento.enviadoPor);
                    this.modeloNotificar.emisor = this._sesionState.snapshot.usuario;
                    this.modeloNotificar.descripcion = `Se ha generado un folio para el documento: ${doc.documento.identificadorDoc.toUpperCase()}`;
                    this._notState.agregarNot(this.modeloNotificar).subscribe();
                    this.ctx.setState((estado: IDocExt[]): IDocExt[] => estado.filter((_: IDocExt, index: number): boolean => index !== indice));
                } else
                {
                    this.ctx.setState(this.initialState);
                }
            }));
        } catch (e)
        {
            toastSweet(TipoAlerta.error, this.error + e, 5000);
        }
    }

    public listarDocsUsuario(): Observable<IResDocEx>
    {
        try
        {
            return this._docsUsuarioQuery.listarDocsPorUsuarioSubproceso(this._sesionState.snapshot.usuario, this.subprocesos).pipe(
                take(1),
                tap((docs: IResDocEx): void =>
                {
                    if (docs.documentos)
                    {
                        this.setState(docs.documentos);
                    } else
                    {
                        this.setState(this.initialState);
                    }
                }));
        } catch (e)
        {
            toastSweet(TipoAlerta.error, this.error + e, 5000);
        }
    }

    subDocsUsuario(): Observable<IDocExt[]>
    {
        return this._docsSubscription.docSubProceso(this._sesionState.snapshot.usuario).pipe(tap((r: IDocExt[]) =>
        {
            if (r)
            {
                this.ctx.setState(r);
            } else
            {
                this.ctx.setState(this.initialState);
            }
        }));
    }

    filtroDocs(_id: string, res: IDocExt): void
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
