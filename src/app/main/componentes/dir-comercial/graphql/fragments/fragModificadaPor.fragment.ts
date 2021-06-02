import gql from 'graphql-tag';

export const fragModificadaPor = gql`
    fragment fragModificadaPor on ModificadaPorType
    {
        usuario
        fechaHora
        comentario
    }
`;