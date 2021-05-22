import {gql} from 'apollo-angular';

export const fragDeptos = gql`
    fragment fragDeptos on DeptoType {
        _id
        nombre
        centroGestor
    }
`;
