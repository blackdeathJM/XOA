import gql from 'graphql-tag';
import {fragDatosFacturacion} from '@dir-comercial/fragments/fragFacturacion.fragment';
import {fragContrato} from '@dir-comercial/fragments/fragContrato.fragment';

export const fragCliente = gql`
    fragment fragCliente on ClienteType
    {
        _id
        nombreCompleto
        telefonos
        datosDeFacturacion
        {
            ...fragDatosFacturacion
        }
        contratos
        {
            ...fragContrato
        }
    }
    ${fragDatosFacturacion}
    ${fragContrato}
`;
