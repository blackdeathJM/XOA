import {gql} from '@apollo/client/core';
import {fragOrdenesTrabajo} from './fragments/ordenes-trabajo.fragment';

export const todasOrdenes = gql`
    query
    {
        todasOrdenes
        {
            estatus
            mensaje
            documentos
            {
                ...fragOrdenesTrabajo
            }
        }
    }
    ${fragOrdenesTrabajo}
`;

export const ordenesTrabEstatus = gql`
    query ordenesTrabEstatus($departamentoId: String!, $estatus: String!, $esAdmin: Boolean!)
    {
        ordenesTrabEstatus(departamentoId: $departamentoId, estatus: $estatus, esAdmin: $esAdmin)
        {
            estatus
            mensaje
            documentos
            {
                ...fragOrdenesTrabajo
            }
        }
    }
    ${fragOrdenesTrabajo}
`;
export const ordenesPorDepto = gql`
    query ordenesPorDepto($departamentoId: String!)
    {
        ordenesPorDepto(departamentoId: $departamentoId)
        {
            estatus
            mensaje
            documentos
            {
                ...fragOrdenesTrabajo
            }
        }
    }
    ${fragOrdenesTrabajo}
`;

