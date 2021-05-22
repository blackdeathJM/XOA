import {gql} from '@apollo/client/core';

export const fragOrdenTrabAreaTec = gql`
    fragment fragOrdenTrabAreaTec on OrdenAreaTecnicaType
    {
        rpu
        noContrato
        noMedidor
        nombre
        apellidos
        calle
        colonia
        entreCalles
        referencia
        telefonos
    }
`;
