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

export const realizarPago = gql`
    mutation realizarPago($_id: ID!, $valor: Boolean!)
    {
        realizarPago(_id: $_id, valor: $valor)
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

export const actualizarSolicitud = gql`
    mutation actualizarSolicitud($_id: ID!, $observaciones: String, $aprobadoServ: Boolean!, $ejecutadaPor: String!)
    {
        actualizarSolicitud(_id: $_id, observaciones: $observaciones, aprobadoServ:$aprobadoServ, ejecutadaPor: $ejecutadaPor)
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

