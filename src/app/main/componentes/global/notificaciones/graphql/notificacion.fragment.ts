import {gql} from 'apollo-angular';

export const fragNotificacion = gql`
    fragment fragNotificacion on NotificacionType
    {
        _id
        descripcion
        emisor
        receptor
        fechaEnvio
        visto
        prioridad
    }
`;
