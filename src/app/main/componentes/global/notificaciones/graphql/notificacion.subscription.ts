import {gql} from 'apollo-angular';
import {fragNotificacion} from './notificacion.fragment';

export const notificar = gql`
    subscription notificar($receptor: String!)
    {
        notificar(receptor: $receptor)
        {
            ...fragNotificacion
        }
    }
    ${fragNotificacion}
`;
