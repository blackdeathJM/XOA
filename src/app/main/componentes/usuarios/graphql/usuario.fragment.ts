import {gql} from 'apollo-angular';
export const fragUsuario = gql`
    fragment fragUsuario on UsuarioType
    {
        _id
        departamentoID
        nombre
        usuario
        contrasena
        role
        img
        departamento
        {
            _id
            nombre
        }
    }
`;
