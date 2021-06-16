import gql from 'graphql-tag';
import {fragCliente} from '../fragments/fragCliente.fragment';


export const regCliente = gql`
    mutation regCliente($cliente: ClienteInput)
    {
        regCliente(cliente: $cliente)
        {
            estatus
            mensaje
            documento
            {
                ...fragCliente
            }
        }
    }
    ${fragCliente}
`;

export const regContrato = gql`
    mutation regContrato($idCliente: ID!, $contrato: ContratoInput, $idSolicitud: ID!)
    {
        regContrato(idCliente: $idCliente, contrato: $contrato, idSolicitud: $idSolicitud)
        {
            estatus
            mensaje
            documento
            {
                ...fragCliente
            }
        }
    }
    ${fragCliente}
`;
