import {gql} from 'apollo-angular';

export const fragParametrosElectricos = gql`
    fragment fragParametrosElectricos on ParametrosType
    {
        id
        ano
        mes
        dia
        v1
        v2
        v3
        promedio
    }
`;