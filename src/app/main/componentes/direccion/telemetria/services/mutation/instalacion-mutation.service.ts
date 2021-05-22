import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {ApiService} from '@services/api.service';
import {IInstalacion} from '@telemetria/instalacion-interface';
import {IResInstalacion} from '@telemetria/respuesta-interface';
import {Observable} from 'rxjs';
import {
    actBobma,
    actElimIp,
    actInstalacion,
    actMotor,
    agIps,
    bajaEquipo,
    bajaMedidor,
    editarLectura,
    evidencia,
    regBomba,
    regInstalacion,
    regLecturas,
    regMedidor,
    regMotor,
    regParamElectricos,
    regReciboCfe
} from '@telemetria/mutation/instalacion-mutation';
import {todasInstalaciones} from '@telemetria/query/instalacion-query';
import {IParams} from '@telemetria/parametros-electricos-interface';
import {IBomba, IMotor} from '@telemetria/equipo-electrico-interface';
import {IMedidor, IRecibosCfe} from '@telemetria/medidor-interface';
import {ILecturas} from '@telemetria/lecturas-interface';

@Injectable({
    providedIn: 'root'
})
export class InstalacionMutationService extends ApiService
{

    constructor(apollo: Apollo)
    {
        super(apollo);
    }

    regInstalacion(instalacion: IInstalacion): Observable<IResInstalacion>
    {
        return this.mutation(regInstalacion, {instalacion}, {}, ['data', 'regInstalacion'], []);
    }

    actInstalacion(instalacion: IInstalacion): Observable<IResInstalacion>
    {
        return this.mutation(actInstalacion, {instalacion}, {}, ['data', 'actInstalacion'], [{query: todasInstalaciones}]);
    }

    agIps(_id: string, tipo: string, ip: string): Observable<IResInstalacion>
    {
        return this.mutation(agIps, {_id, tipo, ip}, {}, ['data', 'agIps'], []);
    }

    actElimIp(_id: string, tipo: string, ipAnterior: string, ipNva: string): Observable<IResInstalacion>
    {
        return this.mutation(actElimIp, {_id, tipo, ipAnterior, ipNva}, {}, ['data', 'actElimIp'], []);
    }

    regParamElectricos(_id: string, parametrosElectricos: IParams, parametro: string): Observable<IResInstalacion>
    {
        return this.mutation(regParamElectricos, {
            _id,
            parametrosElectricos,
            parametro
        }, {}, ['data', 'regParamElectricos'], []);
    }

    regMotor(_id: string, motor: IMotor): Observable<IResInstalacion>
    {
        return this.mutation(regMotor, {_id, motor}, {}, ['data', 'regMotor'], []);
    }

    actMotor(_id: string, motor: IMotor): Observable<IResInstalacion>
    {
        return this.mutation(actMotor, {_id, motor}, {}, ['data', 'actMotor'], []);
    }

    regBomba(_id: string, bomba: IBomba): Observable<IResInstalacion>
    {
        return this.mutation(regBomba, {_id, bomba}, {}, ['data', 'regBomba'], [{query: todasInstalaciones}]);
    }

    actBomba(_id: string, bomba: IBomba): Observable<IResInstalacion>
    {
        return this.mutation(actBobma, {_id, bomba}, {}, ['data', 'actBomba'], []);
    }

    bajaEquipo(_id: string, id: string, fechaBaja: string, equipo: string, motivoRetiro: string): Observable<IResInstalacion>
    {
        return this.mutation(bajaEquipo, {_id, id, fechaBaja, equipo, motivoRetiro}, {}, ['data', 'bajaEquipo']);
    }

    evidencia(_id: string, id: string, coleccionImg: string[], esInstalacion: boolean, equipo: string): Observable<IResInstalacion>
    {
        return this.mutation(evidencia, {_id, id, coleccionImg, esInstalacion, equipo}, {}, ['data', 'evidencia']);
    }

    regLecturas(_id: string, tipo: string, lecturas: ILecturas): Observable<IResInstalacion>
    {
        return this.mutation(regLecturas, {_id, tipo, lecturas}, {}, ['data', 'regLecturas'], []);
    }

    editarLectura(_id: string, ano: number, mes: string, tipoLect: string, valorMes: number, totalMes: number): Observable<IResInstalacion>
    {
        return this.mutation(editarLectura, {_id, ano, mes, tipoLect, valorMes, totalMes}, {}, ['data', 'editarLectura'],
            []);
    }

    regMedidor(_id: string, medidor: IMedidor): Observable<IResInstalacion>
    {
        return this.mutation(regMedidor, {_id, medidor}, {}, ['data', 'regMedidor'], [{query: todasInstalaciones}]);
    }

    bajaMedidor(_id: string, medidor: string, fechaBaja: string): Observable<IResInstalacion>
    {
        return this.mutation(bajaMedidor, {_id, medidor, fechaBaja}, {}, ['data', 'bajaMedidor'], []);
    }

    regReciboCfe(_id: string, medidor: string, reciboCfe: IRecibosCfe): Observable<IResInstalacion>
    {
        return this.mutation(regReciboCfe, {_id, medidor, reciboCfe}, {}, ['data', 'regReciboCfe'], []);
    }
}
