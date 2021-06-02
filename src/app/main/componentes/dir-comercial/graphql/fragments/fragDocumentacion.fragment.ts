import gql from 'graphql-tag';

export const fragDocumentacion = gql`
    fragment fragDocumentacion on DocumentacionType
    {
        ineFrente
        ineTrasera
        predial
        curp
    }
`;