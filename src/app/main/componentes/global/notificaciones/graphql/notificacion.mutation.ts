import {gql} from 'apollo-angular';
import {fragNotificacion} from './notificacion.fragment';

export const regNotificacion = gql`
    mutation regNotificacion($notificacion: NotificacionInput!)
    {
        regNotificacion(notificacion: $notificacion)
        {
            estatus
            mensaje
            documento
            {
                ...fragNotificacion
            }
        }
    }
    ${fragNotificacion}
`;

export const eliminarNotificacion = gql`
    mutation eliminarNotificacion($_id: ID!)
    {
        eliminarNotificacion(_id: $_id)
        {
            estatus
            mensaje
            documento
            {
                ...fragNotificacion
            }
        }
    }
    ${fragNotificacion}
`;
