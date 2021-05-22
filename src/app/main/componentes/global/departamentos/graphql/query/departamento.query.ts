import {fragDeptos} from '../fragments/fragDepto.fragment';
import {gql} from 'apollo-angular';
import {fragPaginacion} from '../../../../../graphql/paginacion.fragment';

export const obtenerDeptos = gql`
    query obtenerDeptos($pagina: Int, $elementosPorPagina: Int)
    {
        obtenerDeptos(pagina: $pagina, elementosPorPagina: $elementosPorPagina)
        {
            info
            {
                ...fragPaginacion
            }
            estatus
            mensaje
            documentos
            {
                ...fragDeptos
            }
        }
    }
    ${fragPaginacion}
    ${fragDeptos}
`;
