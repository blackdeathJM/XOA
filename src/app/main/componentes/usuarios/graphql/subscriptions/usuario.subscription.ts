import {gql} from 'apollo-angular';

export const cambiarRoleUsuario = gql`
    subscription cambiarRoleUsuario($usuario: String!)
    {
        cambiarRoleUsuario(usuario: $usuario)
        {
            usuario
            token
        }
    }
`;
