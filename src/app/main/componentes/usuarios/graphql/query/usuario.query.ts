import {fragUsuario} from '../usuario.fragment';
import {gql} from 'apollo-angular';

export const obtenerUsuarios = gql`
    query
    {
        obtenerUsuarios
        {
            estatus
            mensaje
            documentos
            {
                ...fragUsuario
            }
        }
    }
    ${fragUsuario}
`;

export const login = gql`
    query login($usuario: String!, $contrasena: String!)
    {
        login(usuario: $usuario, contrasena: $contrasena)
        {
            estatus
            mensaje
            token
        }
    }
`;
