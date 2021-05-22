import gql from 'graphql-tag';

const fragDocumentacion = gql`
    fragment fragDocumentacion on DocumentacionType
    {
        ineFrente
        ineTrasera
        predial
        curp
    }
`;

const fragModificadaPor = gql`
    fragment fragModificadaPor on ModificadaPorType
    {
        usuario
        fechaHora
        comentario
    }
`;

const fragDatosFacturacion = gql`
    fragment fragDatosFacturacion on DatosFacturacionType
    {
        nombre
        calle
        colonia
        rfc
        correo
        rpuAFacturar
    }
`;
const fragConvenioContrato = gql`
    fragment fragConvenioContrato on ConvenioContratoType
    {
        folioConvenio
        calle
        colonia
        cp
        fechaConvenio
        fechaTerminoConvenio
        comentarios
    }
`;

const fragContrato = gql`
    fragment fragContrato on ContratoType
    {
        rpu
        noMedidor
        noContrato
        noCuenta
        fechaAlta
        calle
        entreCalles
        referencia
        estado
        ciudad
        municipio
        colonia
        codigoPostal
        sector
        ruta
        tarifa
        giro
        zona
        noPersonas
        activo
        documentosImg
        {
            ...fragDocumentacion
        }
        creadoPor
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
`;

export const fragCliente = gql`
    fragment fragCliente on ClienteType
    {
        _id
        nombreCompleto
        telefonos
        contratos
        {
            ...fragContrato
        }
        datosDeFacturacion
        {
            ...fragDatosFacturacion
        }
    }
    ${fragContrato}
    ${fragDatosFacturacion}
`;
