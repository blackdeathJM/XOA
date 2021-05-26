import gql from 'graphql-tag';

export const fragSolicitud = gql`
    fragment fragSolicitud on SolicitudServType
    {
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
        MaterialArroyoDeCalle
        MaterialAcera
        comentarios
        aprobadoServ
        matArroyoCalle
        matAcera
    }
`;
