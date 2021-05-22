import {gql} from 'apollo-angular';
import {fragDeptos} from '../fragments/fragDepto.fragment';

export const registroDepto = gql`
    mutation registroDepto($departamento: DepartamentoInput!)
    {
        registroDepto(departamento: $departamento)
        {
            estatus
            mensaje
            documento
            {
                ...fragDeptos
            }
        }
    }
    ${fragDeptos}
`;
export const actualizarDepto = gql`
    mutation actualizarDepto($departamento: DepartamentoInput!)
    {
        actualizarDepto(departamento: $departamento)
        {
            estatus
            mensaje
            documento
            {
                ...fragDeptos
            }
        }
    }
    ${fragDeptos}
`;
