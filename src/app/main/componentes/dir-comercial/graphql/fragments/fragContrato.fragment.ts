import gql from 'graphql-tag';
import {fragDocumentacion} from '@dir-comercial/fragments/fragDocumentacion.fragment';
import {fragModificadaPor} from '@dir-comercial/fragments/fragModificadaPor.fragment';
import {fragConvenioContrato} from '@dir-comercial/fragments/fragConvenio.fragment';
import {fragSolicitud} from '@dir-comercial/fragments/solicitud.fragment';

export const fragContrato = gql`
    fragment fragContrato on ContratoType
    {
        datosSolicitud
        {
            ...fragSolicitud
        }
        estado
        ciudad
        municipio
        codigoPostal
        rpu
        noMedidor
        noContrato
        noCuenta
        fechaAlta
        sector
        ruta
        giro
        zona
        activo
        esPrincipal
        creadoPor
        longitud
        latitud
        documentosImg
        {
            ...fragDocumentacion
        }
        modificadoPor
        {
            ...fragModificadaPor
        }
        convenio
        {
            ...fragConvenioContrato
        }
    }
    ${fragDocumentacion}
    ${fragModificadaPor}
    ${fragConvenioContrato}
    ${fragSolicitud}
`;