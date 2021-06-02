import gql from 'graphql-tag';
import {fragSolicitud} from '@dir-comercial/fragments/solicitud.fragment';

export const regSolicitudServ = gql`
    mutation regSolicitudServ($solicitudServ: SolicitudServInput)
    {
        regSolicitudServ(solicitudServ: $solicitudServ)
        {
            estatus
            mensaje
            documento
            {
                ...fragSolicitud
            }
        }
    }
    ${fragSolicitud}
`;

export const aprovRechSolicitud = gql`
    mutation aprovRechSolicitud($_id: ID!, $valor: Boolean!)
    {
        aprovRechSolicitud(_id: $_id, valor: $valor)
        {
            estatus
            mensaje
            documento
            {
                ...fragSolicitud
            }
        }
    }
    ${fragSolicitud}
`;

