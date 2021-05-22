import {gql} from 'apollo-angular';

export const fragPaginacion = gql`
    fragment fragPaginacion on InfoPaginacion
    {
        pagina
        paginas
        total
        elementosPorPagina
    }
`;
