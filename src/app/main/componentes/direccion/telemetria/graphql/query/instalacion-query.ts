import {gql} from 'apollo-angular';
import {fragInstalacion} from '../fragments/fragInstalacion';

export const todasInstalaciones = gql`
    query
    {
        todasInstalaciones
        {
            estatus
            mensaje
            documentos
            {
                ...fragInstalacion
            }
        }
    }
    ${fragInstalacion}
`;
