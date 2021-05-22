import {gql} from 'apollo-angular';
import {fragDocExt} from './docExterna.fragment';


export const regDocExt = gql`
    mutation regDocExt($docExt: DocExtInput!)
    {
        regDocExt(docExt: $docExt)
        {
            estatus
            mensaje
            documento
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;

export const desactivarNot = gql`
    mutation desactivarNot($_id: ID!, $usuario: String!)
    {
        desactivarNot(_id: $_id, usuario: $usuario)
        {
            estatus
            mensaje
            documento
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;

export const aprobarRechazarDoc = gql`
    mutation aprobarRechazarDoc($_id: ID!, $usuario: String!, $subproceso: String!, $observaciones: String!)
    {
        aprobarRechazarDoc(_id: $_id, usuario: $usuario, subproceso: $subproceso, observaciones: $observaciones)
        {
            estatus
            mensaje
            documento
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;

export const acDarPorEntregado = gql`
    mutation acDarPorEntregado($_id: ID!)
    {
        acDarPorEntregado(_id: $_id)
        {
            estatus
            mensaje
            documento
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;
export const acInfoDoc = gql`
    mutation acInfoDoc($documento: DocExtInput)
    {
        acInfoDoc(documento: $documento)
        {
            estatus
            mensaje
            documento
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;

export const quitarUsuario = gql`
    mutation quitarUsuario($_id: ID!, $usuarioDestino: String!)
    {
        quitarUsuario(_id: $_id, usuarioDestino: $usuarioDestino)
        {
            estatus
            mensaje
            documento
            {
                ...fragDocExt
            }
        }
    }
    ${fragDocExt}
`;
