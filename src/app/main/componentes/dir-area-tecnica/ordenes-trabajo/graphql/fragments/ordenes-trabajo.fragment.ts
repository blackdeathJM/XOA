import {gql} from '@apollo/client/core';
import {fragOrdenTrabajoTele} from './orden-trabajo-tele';
import {fragOrdenTrabAreaTec} from './orden-trabajo-area-tec';
import {fragDeptos} from '@global/graphql/fragments/fragDepto.fragment';
import {fragNotasAlmacen} from './notasAlmacen.frag';

export const fragOrdenesTrabajo = gql`
    fragment fragOrdenesTrabajo on OrdenesTrabajoType
    {
        _id
        noOrden
        departamentoId
        fechaOrden
        fechaEjecucion
        tipoOrden
        comentarios
        anomalia
        observaciones
        ordenAtencion
        estatus
        creadaPor
        ejecutadaPor
        prioridad
        ordenTelemetria
        {
            ...fragOrdenTrabajoTele
        }
        ordenAreaTecnica
        {
            ...fragOrdenTrabAreaTec
        }
        notasAlmacen
        {
            ...fragNotasAlmacen
        }
        departamento
        {
            ...fragDeptos
        }
    }
    ${fragDeptos}
    ${fragOrdenTrabajoTele}
    ${fragOrdenTrabAreaTec}
    ${fragNotasAlmacen}
`;
