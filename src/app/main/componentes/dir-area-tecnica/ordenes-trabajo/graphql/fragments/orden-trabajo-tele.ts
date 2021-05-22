import {gql} from '@apollo/client/core';

export const fragOrdenTrabajoTele = gql`
    fragment fragOrdenTrabajoTele on OrdenTelemetriaType
    {
        instalacion
    }
`;
