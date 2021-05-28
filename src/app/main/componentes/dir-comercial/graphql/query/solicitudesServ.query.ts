import gql from 'graphql-tag';
import {fragSolicitud} from '@dir-comercial/fragments/solicitud.fragment';

export const solPorCliente = gql`
    query solPorCliente($idCliente: ID!)
    {
        solPorCliente(idCliente: $idCliente)
        {
            estatus
            mensaje
            documentos
            {
                ...fragSolicitud
            }
        }
    }
    ${fragSolicitud}
`;
