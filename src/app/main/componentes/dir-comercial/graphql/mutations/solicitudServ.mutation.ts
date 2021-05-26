import gql from 'graphql-tag';
import {fragSolicitud} from '@dir-comercial/fragments/solicitud.fragment';

export const regSolicitudServ = gql`
    query regSolicitudServ($idCliente:ID!, $solicitudServ: SolicitudServInput)
    {
        regSolicitudServ(idCliente: $idCliente, solicitudServ: $solicitudServ)
        {
            estatus
            mensaje
            documento
            {
                ...fragSolicitud
            }
        }
        ${fragSolicitud}
    }
`;
