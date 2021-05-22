import {DataAction, Payload, StateRepository} from '@ngxs-labs/data/decorators';
import {State} from '@ngxs/store';
import {IInstalacion} from '@telemetria/instalacion-interface';
import {Injectable} from '@angular/core';
import {NgxsDataRepository} from '@ngxs-labs/data/repositories';
import {InstalacionQueryService} from '@telemetria/query/instalacion-query.service';
import {InstalacionMutationService} from '@telemetria/mutation/instalacion-mutation.service';
import {Observable} from 'rxjs';
import {IResInstalacion} from '@telemetria/respuesta-interface';
import {IBomba, IMotor} from '@telemetria/equipo-electrico-interface';
import {IParams} from '@telemetria/parametros-electricos-interface';
import {ILecturas} from '@telemetria/lecturas-interface';
import {IMedidor, IRecibosCfe} from '@telemetria/medidor-interface';
import {tap} from 'rxjs/operators';
import {GralesServices} from '@services/grales.service';

@StateRepository()
@State<IInstalacion[]>({name: 'Telemetria', defaults: null})
@Injectable()
export class TelemetriaState extends NgxsDataRepository<IInstalacion[]>
{
    constructor(private _instQuery: InstalacionQueryService, private _instMutation: InstalacionMutationService)
    {
        super();
    }

    @DataAction() regInstalacion(@Payload('Registro instalacion') instalacion: IInstalacion): Observable<IResInstalacion>
    {
        return this._instMutation.regInstalacion(instalacion).pipe(tap((inst: IResInstalacion) =>
        {
            this.ctx.setState((state: IInstalacion[]): IInstalacion[] => state.concat(inst.documento));
        }));
    }

    @DataAction() actInstalacion(@Payload('Actualizar instalacion') instalacion: IInstalacion): Observable<IResInstalacion>
    {
        return this._instMutation.actInstalacion(instalacion).pipe(tap((inst: IResInstalacion) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(instalacion._id, this.ctx).concat(inst.documento));
        }));
    }

    @DataAction() regMotor(@Payload('Registro motor') idInstalacion: string, motor: IMotor): Observable<IResInstalacion>
    {
        return this._instMutation.regMotor(idInstalacion, motor).pipe(tap((doc: IResInstalacion) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(idInstalacion, this.ctx).concat(doc.documento));
        }));
    }

    @DataAction() actMotor(@Payload('Actualizar motor') idInstalacion: string, motor: IMotor): Observable<IResInstalacion>
    {
        return this._instMutation.actMotor(idInstalacion, motor).pipe(tap((doc: IResInstalacion) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(idInstalacion, this.ctx).concat(doc.documento));
        }));
    }

    @DataAction() actBomba(@Payload('Actualizar bomba') idInstalacion: string, bomba: IBomba): Observable<IResInstalacion>
    {
        return this._instMutation.actBomba(idInstalacion, bomba).pipe(tap((doc: IResInstalacion) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(idInstalacion, this.ctx).concat(doc.documento));
        }));
    }

    @DataAction() regBomba(@Payload('Registro de bomba') idInstalacion: string, bomba: IBomba): Observable<IResInstalacion>
    {
        return this._instMutation.regBomba(idInstalacion, bomba).pipe(tap((b: IResInstalacion) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(idInstalacion, this.ctx).concat(b.documento));
        }));
    }

    @DataAction() agIps(@Payload('Agregar IP') _id: string, tipo: string, ip: string): Observable<IResInstalacion>
    {
        return this._instMutation.agIps(_id, tipo, ip).pipe(tap((res: IResInstalacion) =>
        {
            if (res.estatus)
            {
                this.ctx.setState(GralesServices.nvoEdo(_id, this.ctx).concat(res.documento));
                this._instQuery.cambioInstalcion(res.documento);
            }
        }));
    }

    @DataAction() actElimIp(@Payload('Actualizar o eliminar ip') _id: string, tipo: string, ipAnterior: string, ipNva: string): Observable<IResInstalacion>
    {
        return this._instMutation.actElimIp(_id, tipo, ipAnterior, ipNva).pipe(tap((doc: IResInstalacion) =>
        {
            if (doc.estatus)
            {
                this.ctx.setState(GralesServices.nvoEdo(_id, this.ctx).concat(doc.documento));
                this._instQuery.cambioInstalcion(doc.documento);
            }
        }));
    }

    @DataAction() bajaEquipo(@Payload('Baja equipo') _id: string, id: string, fechaBaja: string, equipo: string,
                             motivoRetiro: string): Observable<IResInstalacion>
    {
        return this._instMutation.bajaEquipo(_id, id, fechaBaja, equipo, motivoRetiro).pipe(tap((res: IResInstalacion) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(_id, this.ctx).concat(res.documento));
        }));
    }

    @DataAction() evidencia(@Payload('Agregar evidencia') _id: string, id: string, coleccionImg: string[], esInstalacion: boolean,
                            equipo: string): Observable<IResInstalacion>
    {
        return this._instMutation.evidencia(_id, id, coleccionImg, esInstalacion, equipo).pipe(tap((res: IResInstalacion) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(_id, this.ctx).concat(res.documento));
        }));
    }

    @DataAction() regParamElectricos(@Payload('Registro params Electricos') _id: string, paramsEle: IParams, parametro: string): Observable<IResInstalacion>
    {
        return this._instMutation.regParamElectricos(_id, paramsEle, parametro).pipe(tap((res: IResInstalacion) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(_id, this.ctx).concat(res.documento));
        }));
    }

    @DataAction() regLecturas(@Payload('Registrar lectura') _id: string, tipo: string, lecturas: ILecturas): Observable<IResInstalacion>
    {
        return this._instMutation.regLecturas(_id, tipo, lecturas).pipe(tap((res: IResInstalacion) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(_id, this.ctx).concat(res.documento));
        }));
    }

    @DataAction() editarLectura(@Payload('Editar lectura') _id: string, ano: number, mes: string, tipoLect: string, valorMes: number,
                                totalMes: number): Observable<IResInstalacion>
    {
        return this._instMutation.editarLectura(_id, ano, mes, tipoLect, valorMes, totalMes).pipe(tap((res: IResInstalacion) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(_id, this.ctx).concat(res.documento));
        }));
    }

    @DataAction() regMedidor(@Payload('Reg medidor') _id: string, medidor: IMedidor): Observable<IResInstalacion>
    {
        return this._instMutation.regMedidor(_id, medidor).pipe(tap((med: IResInstalacion) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(_id, this.ctx).concat(med.documento));
        }));
    }

    @DataAction() bajaMedidor(@Payload('Baja medidor') _id: string, medidor: string, fecha: string): Observable<IResInstalacion>
    {
        return this._instMutation.bajaMedidor(_id, medidor, fecha).pipe(tap((med: IResInstalacion) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(_id, this.ctx).concat(med.documento));
        }));
    }

    @DataAction() regReciboCfe(@Payload('Reg recibo cfe') _id: string, medidor: string, reciboCfe: IRecibosCfe): Observable<IResInstalacion>
    {
        return this._instMutation.regReciboCfe(_id, medidor, reciboCfe).pipe(tap((rec: IResInstalacion) =>
        {
            this.ctx.setState(GralesServices.nvoEdo(_id, this.ctx).concat(rec.documento));
        }));
    }

    @DataAction() listaInst(): Observable<IResInstalacion>
    {
        return this._instQuery.todasInstalaciones().pipe(tap((res: IResInstalacion) => this.setState(res.documentos)));
    }
}
