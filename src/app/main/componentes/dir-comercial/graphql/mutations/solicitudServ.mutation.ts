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
