import {gql} from 'apollo-angular';
import {fragDocExt} from './docExterna.fragment';

export const todosDocsExtSub = gql`
    subscription
    {
        todosDocsExtSub
        {
            ...fragDocExt
        }
    }
    ${fragDocExt}
`;

export const docSubProceso = gql`
    subscription docSubProceso($usuario: String!)
    {
        docSubProceso(usuario: $usuario)
        {
            ...fragDocExt
        }
    }
    ${fragDocExt}
`;
