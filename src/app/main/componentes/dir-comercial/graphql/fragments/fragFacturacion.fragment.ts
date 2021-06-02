import gql from 'graphql-tag';

export const fragDatosFacturacion = gql`
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