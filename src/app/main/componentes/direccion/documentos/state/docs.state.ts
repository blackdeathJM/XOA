import {State} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {DataAction, Payload, StateRepository} from '@ngxs-labs/data/decorators';
import {DocExtQueryService} from '../services/doc-ext-query.service';
import {DocExtMutationsService} from '../services/doc-ext-mutations.service';
import {Observable} from 'rxjs';
import {IDocExt, IResDocEx} from '../models/docExt.interface';
import {tap} from 'rxjs/operators';
import {DocExtSubscriptionService} from '../services/doc-ext-subscription.service';
import {toastSweet} from '@shared/alerts/toasts';
import {TipoAlerta} from '@shared/alerts/values.config';
import Swal from 'sweetalert2/dist/sweetalert2';
import {SesionState} from '@usuarios/state/sesion.state';
import {orderBy} from 'lodash-es';
import {INotificacion, PRIORIDAD} from '@global/models/notificacion.interface';
import moment from 'moment';
import {NotificarState} from '@global/state/notificar.state';
import {ProcesosDoc} from '@Config/enums';

@StateRepository()
@State<IDocExt[]>({name: 'docs', defaults: null})
@Injectable()
export class DocsState extends NgxsDataRepository<IDocExt[]>
{
    modeloNotificar: INotificacion =
        {
            descripcion: '',
            emisor: '',
            fechaEnvio: moment().toISOString(),
            prioridad: PRIORIDAD.NORMAL,
            receptor: [],
            visto: false
        };
    error: 'Ha ocurrido un error inesperado ';

    constructor(private docsQuery: DocExtQueryService, private docsMutation: DocExtMutationsService, private sesionState: SesionState,
                private docsSubscription: DocExtSubscriptionService, private notificarState: NotificarState)
    {
        super();
    }

    @DataAction() agregarDocExt(@Payload('docs') documentoRecibido: IDocExt, receptoresNotificacion: string[]): Observable<IResDocEx>
    {
        try
        {
            return this.docsMutation.regDocExt(documentoRecibido).pipe(
                tap((doc: IResDocEx) =>
                {
                    this.modeloNotificar.receptor = receptoresNotificacion;
                    this.modeloNotificar.descripcion = `Haz recibido un nuevo documento: ${doc.documento.identificadorDoc}`;
                    this.modeloNotificar.emisor = this.sesionState.snapshot.usuario;
                    this.notificarState.agregarNot(this.modeloNotificar).subscribe();
                    this.ctx.setState((state: IDocExt[]): IDocExt[] => orderBy(state.concat(doc.documento), ['noSeguimiento'], ['desc']));
                }));
        } catch (e)
        {
            toastSweet(TipoAlerta.error, this.error + ' ' + e, 5000);
        }
    }

    @DataAction() terminarDoc(@Payload('docs') _id: string): void
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
                this.docsMutation.acDarPorEntregado(_id).subscribe((doc: IResDocEx) =>
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

    @DataAction() actInfoDoc(@Payload('docs') documento: IDocExt): Observable<IResDocEx>
    {
        try
        {
            return this.docsMutation.acInfoDoc(documento).pipe(
                tap((doc: IResDocEx) =>
                {
                    this.ctx.setState(orderBy(this.nvoEstado(documento._id).concat(doc.documento), ['noSeguimiento'], ['desc']));
                }));
        } catch (e)
        {
            toastSweet(TipoAlerta.error, this.error + ' ' + e, 3000);
        }
    }

    @DataAction() desactivarNot(@Payload('desactivarNot') id: string, usuario: string): Observable<IResDocEx>
    {
        return this.docsMutation.desactivarNot(id, usuario).pipe(tap((doc: IResDocEx) =>
        {
            this.ctx.setState(orderBy(this.nvoEstado(id).concat(doc.documento), ['noSeguimiento'], ['desc']));
        }));
    }

    @DataAction() aprobarRechazarDoc(@Payload('aprobarRechazarDoc') _id: string, usuario: string, subproceso: string, observaciones: string): Observable<IResDocEx>
    {
        try
        {
            return this.docsMutation.aprobarRechazarDoc(_id, usuario, subproceso, observaciones).pipe(
                tap((doc: IResDocEx) =>
                {
                    this.modeloNotificar.receptor.push(usuario);
                    this.modeloNotificar.emisor = this.sesionState.snapshot.usuario;
                    this.modeloNotificar.descripcion = `El documento: ${doc.documento.identificadorDoc} ${subproceso.toUpperCase()}`;
                    this.notificarState.agregarNot(this.modeloNotificar).subscribe();
                    this.ctx.setState(orderBy(this.nvoEstado(_id).concat(doc.documento), ['noSeguimiento'], ['desc']));
                }));
        } catch (e)
        {
            toastSweet(TipoAlerta.error, this.error + e, 5000);
        }
    }

    @DataAction() quitarUsuario(@Payload('Quitar usuario') _id: string, usuarioDestino: string): Observable<IResDocEx>
    {
        return this.docsMutation.quitarUsuario(_id, usuarioDestino).pipe(tap((res: IResDocEx) =>
        {
            this.ctx.setState(this.nvoEstado(_id).concat(res.documento));
        }));
    }

// Consultas
    // Consultar documentos por proceso
    @DataAction() listarDocsPen(): Observable<IResDocEx>
    {
        return this.docsQuery.todosDocsExt(ProcesosDoc.entregado).pipe(tap((res: IResDocEx) =>
        {
            if (res.documentos)
            {
                this.ctx.setState(res.documentos);
            }
        }));
    }

    @DataAction() todosLosDocs(): Observable<IResDocEx>
    {
        return this.docsQuery.todosLosDocs().pipe(tap((res: IResDocEx) => this.ctx.setState(res.documentos)));
    }

    @DataAction() consultarDocsPorProceso(@Payload('docs') proceso: string): Observable<IResDocEx>
    {
        return this.docsQuery.docExtProceso(proceso).pipe(tap((doc: IResDocEx): void =>
        {
            this.ctx.setState(doc.documentos);
        }));
    }

    @DataAction() busquedaGral(@Payload('docs') consulta: string): Observable<IResDocEx>
    {
        return this.docsQuery.busquedaGral(consulta).pipe(tap((res: IResDocEx) =>
        {
            this.ctx.setState(res.documentos);
        }));
    }

    @DataAction() busquedaPorUsuario(@Payload('docs') usuario: string): Observable<IResDocEx>
    {
        return this.docsQuery.todosLosDocsPorUsuario(usuario).pipe(tap((docs: IResDocEx): void =>
        {
            this.ctx.setState(docs.documentos);
        }));
    }

    @DataAction() busquedaEntreFechas(@Payload('docs') fechas: string[]): Observable<IResDocEx>
    {
        return this.docsQuery.docsEntreFechas(fechas[0], fechas[1]).pipe(tap((docs: IResDocEx): void =>
        {
            this.ctx.setState(docs.documentos);
        }));
    }

    @DataAction() docPorTipo(@Payload('Buscar por tipo') tipoDoc: string): Observable<IResDocEx>
    {
        return this.docsQuery.docPorTipo(tipoDoc).pipe(tap((res: IResDocEx) =>
        {
            this.ctx.setState(res.documentos);
        }));
    }

    @DataAction() subDocs(): Observable<IDocExt[]>
    {
        return this.docsSubscription.todosDocsExtSub().pipe(tap((docs: IDocExt[]) =>
        {
            if (docs)
            {
                this.reset();
                setTimeout(() =>
                {
                    // this.ctx.patchState(td);
                    this.ctx.setState(docs);
                }, 500);
            }
        }));
    }

    @DataAction() intOExt(@Payload('Interno o externo') esInterno: boolean): Observable<IResDocEx>
    {
        return this.docsQuery.intOExt(esInterno).pipe(tap((docs: IResDocEx) =>
        {
            this.ctx.setState(docs.documentos);
        }));
    }

    @DataAction() ultimoFolio(): Observable<IResDocEx>
    {
        return this.docsQuery.ultimoFolio().pipe(tap((docs: IResDocEx) =>
        {
            this.ctx.setState(docs.documentos);
        }));
    }

    public listarDocumentos(proceso: string): Observable<IResDocEx>
    {
        return this.docsQuery.todosDocsExt(proceso).pipe(tap((docs: IResDocEx): void =>
        {
            this.setState(docs.documentos);
        }));
    }

    private nvoEstado(idDocumento: string): IDocExt[]
    {
        return this.ctx.getState().filter(d => d._id !== idDocumento);
    }
}
