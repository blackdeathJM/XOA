import gql from 'graphql-tag';

export const fragSolicitud = gql`
    fragment fragSolicitud on SolicitudServType
    {
        _id
        idCliente
        noPersonas
        calle
        colonia
        entreCalles
        referencia
        servSolicitado
        medidorRef
        tipoPredio
        areaPredio
        areaConstruida
        almacenamiento
        tarifa
        comentarios
        observaciones
        ejecutadaPor
        aprobadoServ
        matArroyoCalle
        matAcera
        pagoServRealizado
        cliente
        {
            nombreCompleto
            telefonos
        }
    }
`;
