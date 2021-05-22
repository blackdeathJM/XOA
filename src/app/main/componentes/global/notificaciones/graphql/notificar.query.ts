import {gql} from 'apollo-angular';
import {fragNotificacion} from './notificacion.fragment';

export const listarNotificaciones = gql`
    query listarNotificaciones($receptor: String!)
    {
        listarNotificaciones(receptor: $receptor)
        {
            estatus
            mensaje
            documentos
            {
                ...fragNotificacion
            }
        }
    }
    ${fragNotificacion}
`;
