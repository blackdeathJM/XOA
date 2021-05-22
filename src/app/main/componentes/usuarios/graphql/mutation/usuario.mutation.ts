import {fragUsuario} from '../usuario.fragment';
import {gql} from 'apollo-angular';

export const registroUsuario = gql`
    mutation registroUsuario($usuario: UsuarioInput!)
    {
        registroUsuario(usuario: $usuario)
        {
            estatus
            mensaje
            documento
            {
                ...fragUsuario
            }
        }
    }
    ${fragUsuario}
`;
export const eliminarUsuario = gql`
    mutation eliminarUsuario($_id: ID!)
    {
        eliminarUsuario(_id: $_id)
        {
            estatus
            mensaje
            documento
            {
                ...fragUsuario
            }
        }
    }
    ${fragUsuario}
`;

export const actualizarRole = gql`
    mutation actualizarRole($_id: ID!, $role: String!, $esActualizar: Boolean!)
    {
        actualizarRole(_id: $_id, role: $role, esActualizar: $esActualizar)
        {
            estatus
            mensaje
            documento
            {
                ...fragUsuario
            }
        }
    }
    ${fragUsuario}
`;

export const actualizarContrasena = gql`
    mutation actualizarContrasena($usuario: String!, $actualContrasena: String!, $nvaContrasena:String!, $esAdmin: Boolean!)
    {
        actualizarContrasena(usuario: $usuario, actualContrasena: $actualContrasena, nvaContrasena: $nvaContrasena, esAdmin: $esAdmin)
        {
            estatus
            mensaje
            token
        }
    }
`;
