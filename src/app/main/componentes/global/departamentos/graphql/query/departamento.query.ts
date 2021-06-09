import {fragDeptos} from '../fragments/fragDepto.fragment';
import {gql} from 'apollo-angular';

export const obtenerDeptos = gql`
    query
    {
        obtenerDeptos
        {
            estatus
            mensaje
            documentos
            {
                ...fragDeptos
            }
        }
    }
    ${fragDeptos}
`;
