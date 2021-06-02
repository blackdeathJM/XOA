import gql from 'graphql-tag';

export const fragConvenioContrato = gql`
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