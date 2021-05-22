import {gql} from 'apollo-angular';
import {fragDocExt} from '../../../../direccion/documentos/graphql/docExterna.fragment';

export const usuarioSubproceso = gql`
    query usuarioSubproceso($usuario: String!, $subprocesos: [String!]!)
    {
        usuarioSubproceso(usuario: $usuario, subprocesos: $subprocesos)
        {
            estatus
            mensaje
            documentos
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;

export const docsPendFolIntExt = gql`
    query docsPendFolIntExt($usuarioFolio: String!)
    {
        docsPendFolIntExt(usuarioFolio: $usuarioFolio)
        {
            estatus
            mensaje
            documentos
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;

export const busquedaGralUsuario = gql`
    query busquedaGralUsuario($usuario: String!, $consulta: String!)
    {
        busquedaGralUsuario(usuario: $usuario, consulta: $consulta)
        {
            estatus
            mensaje
            documentos
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;
export const docUsuarioTipoDoc = gql`
    query docUsuarioTipoDoc($usuarioFolio: String!, $tipoDoc: String!)
    {
        docUsuarioTipoDoc(usuarioFolio: $usuarioFolio, tipoDoc: $tipoDoc)
        {
            estatus
            mensaje
            documentos
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;
export const docUsuarioExtEntregado = gql`
    query docUsuarioExtEntregado($usuarioFolio: String!)
    {
        docUsuarioExtEntregado(usuarioFolio: $usuarioFolio)
        {
            estatus
            mensaje
            documentos
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;

