import gql from 'graphql-tag';
import {fragCliente} from '../fragments/fragCliente.fragment';

export const clientesPorCriterio = gql`
    query clientesPorCriterio($criterio: String)
    {
        clientesPorCriterio(criterio: $criterio)
        {
            estatus
            mensaje
            documentos
            {
                ...fragCliente
            }
        }
    }
    ${fragCliente}
`;
